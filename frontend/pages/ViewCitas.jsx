import React, { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";

const initialAppointments = [
  { id: 1, title: "Consulta médica", date: "2024-03-15", time: "10:00" },
  { id: 2, title: "Reunión de trabajo", date: "2024-03-16", time: "14:30" },
  { id: 3, title: "Clase de yoga", date: "2024-03-17", time: "18:00" },
];

function ViewCitas() {
  const [appointments, setAppointments] = useState(initialAppointments);

  const cancelAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6 sm:mb-8 text-center">
        Mis Citas Agendadas
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center p-4 sm:p-6 10 border-b border-green-100 hover:bg-green-50 transition-colors duration-300"
            >
              {/* este div de abajo */}
              <div className="p-6 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-green-600" size={20} />
                </div>
              </div>

              <div className="flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-1 sm:mb-2">
                  {appointment.title}
                </h2>
                <div className="flex items-center text-green-600 text-sm sm:text-base mb-1">
                  <Calendar className="mr-2" size={16} />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center text-green-600 text-sm sm:text-base">
                  <Clock className="mr-2" size={16} />
                  <span>{appointment.time}</span>
                </div>
              </div>

              {/* boton rojo */}
              <button
                onClick={() => cancelAppointment(appointment.id)}
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
      </div>
    </div>
  );
}

export default ViewCitas;
