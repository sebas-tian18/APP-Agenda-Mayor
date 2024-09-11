const Register = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-wrap text-3xl"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/picsum/200/300')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center">
        {/* Aquí ajustamos la estructura según el tamaño de pantalla */}
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white shadow-lg min-h-[600px]">
            <div className="bg-gradient-to-b from-emerald-500 to-indigo-500 basis-full md:basis-1/3"></div>

            <div className="basis-full md:basis-2/3 p-6">
              <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
                Registrarse en la plataforma
              </h2>
              <form className="p-2">
                {/* Campo Nombres */}
                <div className="mb-4">
                  <label className="block text-gray-700">Nombres:</label>
                  <input
                    type="text"
                    name="nombres"
                    className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                    placeholder="Nombre1 Nombre2 Nombre3"
                  />
                </div>

                {/* Campos Apellidos */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Apellido Paterno:</label>
                    <input
                      type="text"
                      name="ApellidoP"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Apellido Paterno"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Apellido Materno:</label>
                    <input
                      type="text"
                      name="ApellidoM"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Apellido Materno"
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
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Registro Social de Hogares:</label>
                    <input
                      type="file"
                      name="archivo"
                      className="block w-full text-sm border-gray-300 cursor-pointer outline-none"
                    />
                  </div>
                </div>

                {/* Campo Correo y Contraseña */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Correo:</label>
                    <input
                      type="email"
                      name="correo"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Contraseña:</label>
                    <input
                      type="password"
                      name="contrasena"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="***************"
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
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Teléfono:</label>
                    <input
                      type="text"
                      name="telefono"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="+569 XXXXXXXX"
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
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Sexo:</label>
                    <select
                      name="sexo"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
