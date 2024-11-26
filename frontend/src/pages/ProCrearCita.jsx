import  { useState } from "react";

const CrearCita = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    horaInicio: "",
    horaTermino: "",
    atencionADomicilio: false,
    idServicio: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí envías los datos al backend
    console.log("Datos enviados:", formData);

    // Limpiar el formulario
    setFormData({
      fecha: "",
      horaInicio: "",
      horaTermino: "",
      atencionADomicilio: false,
      idServicio: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-40">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Crear Nueva Cita
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fecha */}
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Hora Inicio */}
        <div>
          <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700">
            Hora de Inicio
          </label>
          <input
            type="time"
            id="horaInicio"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Hora Término */}
        <div>
          <label htmlFor="horaTermino" className="block text-sm font-medium text-gray-700">
            Hora de Término
          </label>
          <input
            type="time"
            id="horaTermino"
            name="horaTermino"
            value={formData.horaTermino}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Atención a Domicilio */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="atencionADomicilio"
            name="atencionADomicilio"
            checked={formData.atencionADomicilio}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="atencionADomicilio" className="ml-2 block text-sm text-gray-900">
            ¿Es atención a domicilio?
          </label>
        </div>

        {/* Servicio */}
        <div>
          <label htmlFor="idServicio" className="block text-sm font-medium text-gray-700">
            Servicio
          </label>
          <select
            id="idServicio"
            name="idServicio"
            value={formData.idServicio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="1">Consulta General</option>
            <option value="2">Terapia Física</option>
            <option value="3">Atención Nutricional</option>
            {/* Agrega más servicios según tu base de datos */}
          </select>
        </div>

        {/* Botón de Enviar */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Crear Cita
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCita;
