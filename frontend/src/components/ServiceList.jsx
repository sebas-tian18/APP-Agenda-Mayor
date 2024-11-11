import ServiceCard from './ServiceCard'

function ServiceList({ services, onServiceSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} onSelect={onServiceSelect} />
      ))}
    </div>
  )
}

export default ServiceList