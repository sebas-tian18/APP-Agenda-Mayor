import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { jwtDecode } from "jwt-decode";

function CalendarApp() {
  const token = sessionStorage.getItem("token");
  const user = jwtDecode(token);
  const userid = user.id_usuario; // ID del usuario logueado
  console.log(userid, "userid");

  const [idAdultoMayor, setIdAdultoMayor] = useState(""); // ID del adulto mayor
  const [citasInfo, setCitasInfo] = useState([]); // Información de las citas

  // Fetch para obtener el ID del adulto mayor asociado al usuario
  useEffect(() => {
    const fetchIdAdultoMayor = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/usuarios/lista/adultomayor/${userid}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar el ID del adulto mayor");
        }
        const data = await response.json();
        console.log(data, "idAdultoMayor");
        setIdAdultoMayor(data.id_adulto_mayor); // Asignar el ID del adulto mayor
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchIdAdultoMayor();
  }, [userid]);

  // Fetch para obtener las citas del adulto mayor
  useEffect(() => {
    const fetchCitasInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/usuarios/lista/Citaadultomayor/${idAdultoMayor}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar las citas del adulto mayor");
        }
        const data = await response.json();
        console.log(data, "data");
        // Asegúrate de que citasInfo sea un arreglo
        setCitasInfo(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (idAdultoMayor) {
      fetchCitasInfo();
    }
  }, [idAdultoMayor]);

  // Transformar las citas a formato FullCalendar
  const transformedCitas = citasInfo.map((cita) => ({
    id: cita.id_cita.toString(), // FullCalendar requiere que `id` sea string
    title: `Cita con ID ${cita.id_cita} `,
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
