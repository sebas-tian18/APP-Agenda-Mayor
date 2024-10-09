
const services = [
  {
    title: "Fonoaudiología",
    description: "Servicios especializados de fonoaudiología a domicilio.",
    time: "Para 1 semana",
    location: "Temuco, Chile",
    url: "#fonoaudiologia",
    defaultImage: "../Images/fonoaudiologia.webp",
  },
  {
    title: "Peluquería",
    description: "Cortes y peinados a domicilio para toda la familia.",
    time: "Para 3 días",
    location: "Temuco, Chile",
    url: "#peluqueria",
    defaultImage: "../Images/peluqueria.webp",
  },
  {
    title: "Kinesiología",
    description: "Rehabilitación física para adultos mayores.",
    time: "Para 2 semanas",
    location: "Temuco, Chile",
    url: "#kinesiologia",
    defaultImage: "../Images/kinesiologia.webp",
  },
  {
    title: "Odontología",
    description: "Cuidado dental y limpiezas profesionales a domicilio.",
    time: "Para 4 días",
    location: "Temuco, Chile",
    url: "#odontologia",
    defaultImage: "../Images/odontologia.webp",
  },
  {
    title: "Podología",
    description: "Atención de podología para personas mayores.",
    time: "Para 1 semana",
    location: "Temuco, Chile",
    url: "#podologia",
    defaultImage: "../Images/podologia.webp",
  },
  {
    title: "Masajes terapéuticos",
    description: "Masajes relajantes y terapéuticos a domicilio.",
    time: "Para 5 días",
    location: "Temuco, Chile",
    url: "#masajes",
    defaultImage: "../Images/masajes-terapeuticos.webp",
  },
  {
    title: "Psicología",
    description: "Terapia psicológica en la comodidad de tu hogar.",
    time: "Para 2 semanas",
    location: "Temuco, Chile",
    url: "#psicologia",
    defaultImage: "../Images/psicologia.webp",
  },
  {
    title: "Nutrición",
    description: "Asesoramiento nutricional personalizado a domicilio.",
    time: "Para 3 semanas",
    location: "Temuco, Chile",
    url: "#nutricion",
    defaultImage: "../Images/nutricion.webp",
  },
];

function ServiceCard({
  title,
  description,
  location,
  time,
  url,
  defaultImage,
}) {
  return (
    <a
      href={url}
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
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>{time}</p>
        <p>{location}</p>
      </div>
    </a>
  );
}

function Servicios() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow">
        <h1 className="text-3xl font-bold">Servicios a Domicilio</h1>
      </div>
      <main className="p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {services.map((service, index) => (  // Recorro la lista de services y uso la funcion ServiceCard para mostrarlo y ya xd 
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Servicios;
