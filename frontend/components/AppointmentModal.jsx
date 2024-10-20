import { useState, useEffect } from 'react'

function AppointmentModal({ service, onClose }) {
  const [availableAppointments, setAvailableAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      try {
        setLoading(true)
        // Asumimos que el id_especialidad corresponde al id del servicio
        const response = await fetch(`http://localhost:3000/citas/${service.id}/noagendadas`)
        if (!response.ok) {
          throw new Error('No se pudieron obtener las citas disponibles')
        }
        const data = await response.json()
        setAvailableAppointments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailableAppointments()
  }, [service.id])

  const handleAppointmentSelect = async (appointmentId) => {
  }

  if (loading) return <div className="text-center">Cargando citas disponibles...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Agendar {service.name}</h2>
        <p className="mb-4">Selecciona una cita disponible:</p>
        <div className="grid grid-cols-1 gap-4 mb-4 max-h-96 overflow-y-auto">
          {availableAppointments.map(appointment => (
            <div key={appointment.id_cita} className="border p-4 rounded-lg hover:bg-gray-50">
              <p className="font-semibold">{new Date(appointment.fecha).toLocaleDateString()}</p>
              <p>Hora: {appointment.hora_inicio} - {appointment.hora_termino}</p>
              <p>Profesional: {appointment.nombre_profesional} {appointment.apellido_profesional}</p>
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