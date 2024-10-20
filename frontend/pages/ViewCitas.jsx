import { useState, useEffect } from "react";
import { Calendar, Clock, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";

function ViewCitas() {
  const token = sessionStorage.getItem("token");
  const user = jwtDecode(token);
  const userid = user.id_usuario;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/usuarios/${userid}/detalles`
        );
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del usuario");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userid]);

  // no funciona esto todavia
  const cancelAppointment = (id) => {
    console.log(id, "id a cancelar");
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  // Retorna un cargando si esta cargando
  if (loading) return <div>Cargando...</div>;
  // Div principal que muestra las citas que tengo agendadas
  return (
    <div className="min-h-screen bg-green-50 from-green-100 to-blue-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6 sm:mb-8 text-center">
        Mis Citas Agendadas
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Muestra las citas que tengo agendadas recorriendo la lista */}
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id_cita} // Usar id_cita
              className="flex items-center p-4 sm:p-6 border-b border-green-100 hover:bg-green-50 transition-colors duration-300"
            >
              <div className="p-6 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-green-600" size={20} />
                </div>
              </div>

              <div className="flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-1 sm:mb-2">
                  Cita con {appointment.nombre_profesional}
                </h2>
                <div className="flex items-center text-green-600 text-sm sm:text-base mb-1">
                  <Calendar className="mr-2" size={16} />
                  {/* Por qué split ("T")? */}
                  {/*porque la fecha es 2024-10-20T03:00:00.000Z */}
                  {/* Y cuando le hacemos un split formamos */}
                  {/* [2024-10-20] [03:00:00.000Z] */}
                  {/* Entonces con el [0] nos quedamos con la fecha */}

                  <span>{appointment.fecha.split("T")[0]}</span> {/* Fecha */}
                </div>
                <div className="flex items-center text-green-600 text-sm sm:text-base">
                  <Clock className="mr-2" size={16} />
                  <span>
                    {appointment.hora_inicio} - {appointment.hora_termino}
                  </span>
                </div>
              </div>

              <button
                onClick={() => cancelAppointment(appointment.id_cita)} // Usar id_cita
                className="ml-2 sm:ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:px-4 rounded-full transition-colors duration-300 flex items-center text-sm sm:text-base"
              >
                <X size={16} className="mr-1" />
                <span>Cancelar</span>
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No tienes citas agendadas en este momento.
          </div>
        )}
        {console.log(appointments, "hola")}
      </div>
    </div>
  );
}

export default ViewCitas;
