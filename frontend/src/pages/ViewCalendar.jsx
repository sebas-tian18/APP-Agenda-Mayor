import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import { jwtDecode } from "jwt-decode";

function CalendarApp() {
  const token = sessionStorage.getItem("token");
  const user = jwtDecode(token);
  const userid = user.id_usuario;

  const [id_usuario, setIdUsuario] = useState("");
  const [citasInfo, setCitasInfo] = useState([]);

  // Fetch para obtener los detalles del usuario
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/usuarios/lista/${userid}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del usuario");
        }
        const data = await response.json();
        setIdUsuario(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUserDetails();
  }, [userid]);

  const userproid = id_usuario.id_profesional;

  // Fetch para obtener las citas del usuario
  useEffect(() => {
    const fetchCitasInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/citas/${userproid}/profesionales`
        );
        if (!response.ok) {
          throw new Error("Error al cargar las citas");
        }
        const data = await response.json();
        setCitasInfo(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (userproid) {
      fetchCitasInfo();
    }
  }, [userproid]);

  // Transformar las citas a formato FullCalendar
  const transformedCitas = citasInfo.map((cita) => ({
    id: cita.id_cita.toString(), // FullCalendar requiere que `id` sea string
    title: `Cita con ID ${cita.id_cita} (${
      cita.id_resolucion === 1 ? "ocupada" : "libre"
    })`,
    start: `${cita.fecha.split("T")[0]}T${cita.hora_inicio.substring(0, 5)}`,
    end: `${cita.fecha.split("T")[0]}T${cita.hora_termino.substring(0, 5)}`,
  }));

  console.log(transformedCitas, "transformedCitas");

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth" // Vista inicial: mes
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek", // Eliminamos la vista de día
        }}
        events={transformedCitas} // Eventos dinámicos
        locale="es" // Idioma español
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false, // Mostrar hora en formato 24h
        }}
        eventContent={(eventInfo) => {
          // Personalizar el contenido de los eventos
          const start = new Date(eventInfo.event.start).toLocaleTimeString(
            "es-ES",
            { hour: "2-digit", minute: "2-digit" }
          );
          const end = new Date(eventInfo.event.end).toLocaleTimeString(
            "es-ES",
            { hour: "2-digit", minute: "2-digit" }
          );

          return (
            <div className="flex-1">
              <b>{eventInfo.event.title}</b>

              <div>
                {start} - {end}
              </div>
            </div>
          );
        }}
        dayMaxEventRows={true} // Permitir mostrar varias filas en un día
      />
    </div>
  );
}

export default CalendarApp;
