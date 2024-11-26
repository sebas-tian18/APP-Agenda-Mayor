import { useState } from 'react'
import ServiceList from '../components/ServiceList'
import AppointmentModal from '../components/AppointmentModal'
import fonoaudiologia from '../images/fonoaudiologia.webp';
import peluqueria from '../images/peluqueria.webp';
import kinesiologia from '../images/kinesiologia.webp';


const services = [
  {
    id: 1,
    name: 'Fonoaudiología',
    description: 'Evaluación y tratamiento de trastornos de la comunicación y deglución.',
    image: fonoaudiologia
  },
  {
    id: 2,
    name: 'Peluquería',
    description: 'Servicios de corte, peinado y coloración de cabello.',
    image: peluqueria
  },
  {
    id: 3,
    name: 'Kinesiología',
    description: 'Terapia física para recuperación y prevención de lesiones.',
    image: kinesiologia
  }
]

function Servicios() {
  const [selectedService, setSelectedService] = useState(null)

  const handleServiceSelect = (service) => {
    setSelectedService(service)
  }

  const handleCloseModal = () => {
    setSelectedService(null)
  }

  return (
    <div className="bg-green-50 min-h-screen mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Agendamiento de Servicios</h1>
      <ServiceList services={services} onServiceSelect={handleServiceSelect} />
      {selectedService && (
        <AppointmentModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default Servicios