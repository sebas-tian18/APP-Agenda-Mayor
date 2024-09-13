import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: '',
    archivo: null,
    email: '',
    contrasena: '',
    Rcontrasena: '',
    telefono: '',
    direccion: '',
    sexo: 'M',
    nacionalidad: 'CL',
    movilidad: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.contrasena !== formData.Rcontrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess(`Usuario registrado con éxito con ID: ${data.id_usuario}`);
        setError(null);
      } else {
        setError(data.error || "Error al registrar el usuario");
        setSuccess(null);
      }
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-wrap text-3xl"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/picsum/200/300')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white shadow-lg min-h-[600px]">
            <div className="bg-gradient-to-b from-emerald-500 to-indigo-500 basis-full md:basis-1/3"></div>

            <div className="basis-full md:basis-2/3 p-6">
              <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
                Registrarse en la plataforma
              </h2>
              <form className="p-2" onSubmit={handleSubmit}>
                {/* Campo Nombres */}
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre Usuario:</label>
                  <input
                    type="text"
                    name="nombre_usuario"
                    className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                    placeholder="Nombre Usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                  />
                </div>

                {/* Campos Apellidos */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Apellido Paterno:</label>
                    <input
                      type="text"
                      name="apellido_paterno"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Apellido Paterno"
                      value={formData.apellido_paterno}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Apellido Materno:</label>
                    <input
                      type="text"
                      name="apellido_materno"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Apellido Materno"
                      value={formData.apellido_materno}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Campo RUT y Archivo */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">RUT:</label>
                    <input
                      type="text"
                      name="rut"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="123456789-0"
                      value={formData.rut}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Registro Social de Hogares:</label>
                    <input
                      type="file"
                      name="archivo"
                      className="block w-full text-sm border-gray-300 cursor-pointer outline-none"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Campo Correo y Contraseña */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Correo:</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Contraseña:</label>
                    <input
                      type="password"
                      name="contrasena"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="***************"
                      value={formData.contrasena}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Repetir Contraseña y Teléfono */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Repetir Contraseña:</label>
                    <input
                      type="password"
                      name="Rcontrasena"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="***************"
                      value={formData.Rcontrasena}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Teléfono:</label>
                    <input
                      type="text"
                      name="telefono"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="+569 XXXXXXXX"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Dirección y Sexo */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Dirección:</label>
                    <input
                      type="text"
                      name="direccion"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Calle falsa 123"
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Sexo:</label>
                    <select
                      name="sexo"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.sexo}
                      onChange={handleChange}
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </div>
                </div>

                {/* Nacionalidad y Problemas de Movilidad */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Nacionalidad:</label>
                    <select
                      name="nacionalidad"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.nacionalidad}
                      onChange={handleChange}
                    >
                      <option value="CL">Chilena</option>
                      <option value="Ex">Extranjero</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Problemas de Movilidad:</label>
                    <select
                      name="movilidad"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.movilidad}
                      onChange={handleChange}
                    >
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Botón Registrarse */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
