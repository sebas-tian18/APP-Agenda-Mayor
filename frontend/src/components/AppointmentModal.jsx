import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

function AppointmentModal({ service, onClose }) {
  const [availableAppointments, setAvailableAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null) // Para mostrar un mensaje de exito
  const token = sessionStorage.getItem("token");
  const user = jwtDecode(token);
  const userid = user.id_usuario; // Obtener ID desde sessionStorage

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://45.236.130.139:3000/api/citas/${service.id}/noagendadas`)
        if (!response.ok) {
          throw new Error('No se pudieron obtener las citas disponibles')
        }
        const data = await response.json()
        setAvailableAppointments(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailableAppointments()
  }, [service.id])

  const handleAppointmentSelect = async (appointmentId) => {
    const isConfirmed = window.confirm("¿Está seguro de que desea agendar esta cita?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`http://45.236.130.139:3000/api/citas/agendar/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: userid
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }
  
      const data = await response.json();
      setSuccessMessage('Cita agendada con éxito');
  
      // Actualiza la lista de citas
      setAvailableAppointments(prev => prev.filter(appointment => appointment.id_cita !== appointmentId));
    } catch (err) {
      setError(err.message);
    }
  };
  

  if (loading) return <div className="text-center">Cargando citas disponibles...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Agendar {service.name}</h2>
        {successMessage && <div className="text-center text-green-500">{successMessage}</div>}
        <p className="mb-4">Selecciona una cita disponible:</p>
        <div className="grid grid-cols-1 gap-4 mb-4 max-h-96 overflow-y-auto">
          {availableAppointments.map(appointment => (
            <div key={appointment.id_cita} className="border p-4 rounded-lg hover:bg-gray-50">
              <p className="font-semibold">{new Date(appointment.fecha).toLocaleDateString()}</p>
              <p>Hora: {appointment.hora_inicio} - {appointment.hora_termino}</p>
              <p>Profesional: {appointment.nombre_profesional}</p>
              <p>Servicio: {appointment.nombre_tipo_servicio}</p>
              <button
                onClick={() => handleAppointmentSelect(appointment.id_cita)}
                className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default AppointmentModal
