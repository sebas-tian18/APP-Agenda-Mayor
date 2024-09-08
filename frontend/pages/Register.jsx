const Register = () => {
    return (
      <div
        className="min-h-screen min-w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/picsum/200/300')" }}
      >
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center ">
          <div className="basis-1/3"></div>
          <div className="basis-1/3 bg-white shadow-lg  flex min-w-[900px] ">
    
          <div className="bg-gradient-to-b from-emerald-500 to-indigo-500 basis-1/3 mr-3">
          </div>
            <div className=" basis-2/3 ">
            <h2 className="text-2xl font-bold p-6 ">Registrarse en la plataforma</h2>
                <form className="p-2">
                    <div className="mb-4  ">
                        <label className="block text-gray-700">Nombres:</label>
                        <input  type="text" name="nombres" className="min-w-full my-1 border-b-2 border-[#FF5100] outline-0" placeholder="Nombre1 Nombre2 Nombre3">
                        </input>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4 flex-col ">
                        <div>
                          <label className="block text-gray-700">Apellido Paterno:</label>
                          <input type="text" name="ApellidoP" className=" my-1 border-b-2 border-[#FF5100] outline-0" placeholder="AAAAAAAAA">
                          </input>                  
                        </div>
                        <div>
                          <label>Apellido Materno:</label>
                          <input type="text" name="ApellidoP" className="w-full my-1 border-b-2 border-[#FF5100] outline-0 " placeholder="BBBBBBBBB">
                          </input>                  
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4 flex-col">
                      <div>
                        <label className="block text-gray-700">RUT: </label>
                        <input type="text" name="rut" className="min-w-FIT my-1 border-b-2 border-[#FF5100] outline-0" placeholder="123456789-0"></input>
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700">Registro Social de Hogares:</label>
                        <input
                          type="file"
                          name="archivo"
                          className="block w-full text-sm border-gray-300 cursor-pointer outline-none"
                          id="file_input"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Correo: </label>
                      <input type="email" name="correo" className="min-w-FIT my-1 border-b-2 border-[#FF5100] outline-0" placeholder="correo@jemplo.com"></input>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contraseña: </label>
                      <input type="password" name="contrasena" className="min-w-FIT my-1 border-b-2 border-[#FF5100] outline-0" placeholder="***************"></input>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700">Repetir contraseña: </label>
                      <input type="password" name="Rcontrasena" className="min-w-fit my-1 border-b-2 border-[#FF5100] outline-0" placeholder="***************"></input>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Telefono: </label>
                      <input type="text" name="telefono" className="min-w-fit my-1 border-b-2 border-[#FF5100] outline-0" placeholder="+569 XXXXXXXX"></input>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Direccion: </label>
                      <input type="text" name="direccion" className="min-w-FIT my-1 border-b-2 border-[#FF5100] outline-0" placeholder="Calle falsa 123"></input>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 ">Sexo: </label>
                      <select name="sexo" className=" min-w-fit my-1 border-b-2 border-[#FF5100] outline-0">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 ">Nacionalidad: </label>
                      <select name="nacionalidad" className=" min-w-fit my-1 border-b-2 border-[#FF5100] outline-0">
                        <option value="CL">Chilena</option>
                        <option value="Ex">Extranjero</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 ">Problemas de movilidad: </label>
                      <select name="sexo" className=" min-w-fit my-1 border-b-2 border-[#FF5100] outline-0">
                        <option value="Trsh">Si</option>
                        <option value="Frsh">Extranjero</option>
                      </select>
                    </div>
                    <button
                                type="submit"
                                className="min-w-48 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
                            >
                                Registrarse
                      </button>
                </form>
            </div>
          </div>
          <div className="basis-1/3"></div>
        </div>
      </div>
    );
  };
  
  export default Register;
  