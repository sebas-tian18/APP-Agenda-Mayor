function ServiceCard({ service, onSelect }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-primary mb-2">{service.name}</h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <button
            onClick={() => onSelect(service)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
          >
            Agendar
          </button>
        </div>
      </div>
    )
  }
  
  export default ServiceCard