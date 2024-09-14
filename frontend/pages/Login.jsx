const Login = () => {
    return (
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/picsum/200/300')",
        }}
      >
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-2xl w-full max-w-4xl rounded-lg flex">
            {/* Sección verde a la izquierda */}
            <div className="hidden md:block bg-gradient-to-b from-emerald-500 to-blue-500 w-1/3 rounded-l-lg"></div>
  
            {/* Sección del formulario */}
            <div className="w-full md:w-2/3 p-10">
              <h2 className="text-5xl font-bold mb-10 text-center">Ingresar a la plataforma</h2>
              <form>
                {/* Campo de Correo */}
                <div className="mb-8">
                  <label className="block text-gray-700 text-3xl">Correo:</label>
                  <input
                    type="email"
                    name="correo"
                    className="w-full my-1 text-3xl border-b-2 border-[#FF5100] outline-none"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
  
                {/* Campo de Contraseña */}
                <div className="mb-8">
                  <label className="block text-gray-700 text-3xl">Contraseña:</label>
                  <input
                    type="password"
                    name="contrasena"
                    className="w-full my-1 text-3xl border-b-2 border-[#FF5100] outline-none"
                    placeholder="***************"
                  />
                </div>
  
                {/* Enlaces */}
                <div className="flex justify-between items-center mb-10">
                  <a href="#" className="text-blue-500 hover:underline text-2xl">No tengo una cuenta</a>
                  <a href="#" className="text-blue-500 hover:underline text-2xl">Recuperar contraseña</a>
                </div>
  
                {/* Botón de Iniciar sesión */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-500 text-white text-3xl p-4 rounded-lg hover:bg-blue-700"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  