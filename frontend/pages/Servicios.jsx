import { useState, useEffect } from "react";


const services = [
  {
    title: "Fonoaudiología",
    description: "Servicios especializados de fonoaudiología a domicilio.",
    defaultImage: "../Images/fonoaudiologia.webp",
    providers: [
      {
        name: "Dra. Ana Pérez",
        date: "2024-10-20",
        location: "Temuco, Chile",
      },
      {
        name: "Dr. Pedro Silva",
        date: "2024-10-21",
        location: "Temuco, Chile",
        time: "10:00",
      },
    ],
  },
  {
    title: "Peluquería",
    description: "Cortes y peinados a domicilio para toda la familia.",
    defaultImage: "../Images/peluqueria.webp",
    providers: [
      {
        name: "Sra. Marta González",
        date: "2024-10-19",
        location: "Temuco, Chile",
      },
      {
        name: "Sr. Juan Morales",
        date: "2024-10-22",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Kinesiología",
    description: "Rehabilitación física para adultos mayores.",
    defaultImage: "../Images/kinesiologia.webp",
    providers: [
      {
        name: "Dr. Ricardo Muñoz",
        date: "2024-10-23",
        location: "Temuco, Chile",
      },
      {
        name: "Dra. Carolina Lara",
        date: "2024-10-24",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Odontología",
    description: "Cuidado dental y limpiezas profesionales a domicilio.",
    defaultImage: "../Images/odontologia.webp",
    providers: [
      {
        name: "Dr. Jaime Ortiz",
        date: "2024-10-25",
        location: "Temuco, Chile",
      },
      {
        name: "Dra. Laura Espinoza",
        date: "2024-10-26",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Podología",
    description: "Atención de podología para personas mayores.",
    defaultImage: "../Images/podologia.webp",
    providers: [
      {
        name: "Dr. Carlos Soto",
        date: "2024-10-27",
        location: "Temuco, Chile",
      },
      {
        name: "Dra. Verónica Ríos",
        date: "2024-10-28",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Masajes terapéuticos",
    description: "Masajes relajantes y terapéuticos a domicilio.",
    defaultImage: "../Images/masajes-terapeuticos.webp",
    providers: [
      {
        name: "Sra. Patricia Figueroa",
        date: "2024-10-29",
        location: "Temuco, Chile",
      },
      {
        name: "Sr. Marcos Vera",
        date: "2024-10-30",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Psicología",
    description: "Terapia psicológica en la comodidad de tu hogar.",
    defaultImage: "../Images/psicologia.webp",
    providers: [
      {
        name: "Dra. Paula Díaz",
        date: "2024-10-31",
        location: "Temuco, Chile",
      },
      {
        name: "Dr. Ernesto López",
        date: "2024-11-01",
        location: "Temuco, Chile",
      },
    ],
  },
  {
    title: "Nutrición",
    description: "Asesoramiento nutricional personalizado a domicilio.",
    defaultImage: "../Images/nutricion.webp",
    providers: [
      {
        name: "Dra. Camila Rojas",
        date: "2024-11-02",
        location: "Temuco, Chile",
      },
      {
        name: "Sr. Diego Vargas",
        date: "2024-11-03",
        location: "Temuco, Chile",
      },
    ],
  },
];


function ServiceCard({ title, description, defaultImage, onClick }) {
  return (
    <a
      href="#"
      onClick={onClick}
      className="block p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img
        src={defaultImage}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-bold text-blue-500 hover:underline">
        {title}
      </h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </a>
  );
}

function ServiceDrawer({ service, onClose }) {
  if (!service) return null; // No mostrar si no hay servicio seleccionado

  return (
    <div
      className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-8 z-50"
    >
      <button onClick={onClose} className="text-red-500">
        Cerrar
      </button>
      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
      <p><strong>Descripción:</strong> {service.description}</p>
      {/* Lista de proveedores */}
      <h3 className="mt-4 text-lg font-semibold">Proveedores disponibles:</h3>
      <ul className="mt-2 space-y-4">
        {service.providers.map((provider, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">Nombre: {provider.name}</p>
              <p>Fecha: {provider.date}</p>
              <p>Ubicación: {provider.location}</p>
              <p>Hora: {provider.time}</p>

            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Agendar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Servicios() {
  const [selectedService, setSelectedService] = useState(null);

  const handleCloseDrawer = () => {
    setSelectedService(null);
  };

  const handleBackgroundClick = () => {
    handleCloseDrawer();
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow">
        <h1 className="text-3xl font-bold">Servicios a Domicilio</h1>
      </div>
      <main className="p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onClick={(e) => {
                  e.preventDefault();
                  handleServiceClick(service);
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Drawer que muestra los detalles del servicio seleccionado */}
      <ServiceDrawer
        service={selectedService}
        onClose={handleCloseDrawer}
      />

      {/* Fondo oscuro cuando el drawer está abierto */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleBackgroundClick} // Cierra drawer cuando se haga clic fuera
        />
      )}
    </div>
  );
}

export default Servicios;
