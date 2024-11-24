import { useState } from 'react';

function AdminForm() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
    sexo: '',
    nacionalidad: '',
    nombreCargo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del administrador:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-green-50">
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Crear Administrador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Nombre de Usuario</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Apellido Paterno</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Apellido Materno</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">RUT</label>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Nacionalidad</label>
            <input
              type="text"
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Nombre del Cargo</label>
            <input
              type="text"
              name="nombreCargo"
              value={formData.nombreCargo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Crear Administrador
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AdminForm;