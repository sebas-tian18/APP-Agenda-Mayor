import { useContext, useState } from "react";
import { FontSizeContext } from "../Components/FontSizeContext";
import { toast } from "sonner";

const Register = () => {
  const { fontSize } = useContext(FontSizeContext);
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    apellido_paterno: "",
    apellido_materno: "",
    rut: "",
    email: "",
    contrasena: "",
    Rcontrasena: "",
    telefono: "",
    direccion: "",
    tipo_domicilio: "casa",
    sexo: "M",
    nacionalidad: "CL",
    movilidad: false,
  });

  const [fotoCarnet, setFotoCarnet] = useState(null); // Estado para la foto del carnet
  const [rshArchivo, setRshArchivo] = useState(null); // Estado para el archivo de RSH

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "foto_carnet") {
      setFotoCarnet(e.target.files[0]);
    } else if (name === "archivo") {
      setRshArchivo(e.target.files[0]);
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
      toast.error("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del formulario:");
    console.log("FormData (objeto):", formData);
    console.log(
      "Foto de Carnet:",
      fotoCarnet ? fotoCarnet.name : "No se ha subido ninguna foto"
    );
    console.log(
      "Archivo de RSH:",
      rshArchivo ? rshArchivo.name : "No se ha subido ningún archivo"
    );

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (fotoCarnet) {
        data.append("foto_carnet", fotoCarnet);
      }
      if (rshArchivo) {
        data.append("rsh_archivo", rshArchivo);
      }

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `Usuario registrado con éxito con ID: ${result.id_usuario}`
        );
      } else {
        toast.warning(result.error || "Error al registrar el usuario");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-wrap"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/picsum/200/300')",
        fontSize: `${fontSize}px`,
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
                    <label className="block text-gray-700">
                      Apellido Paterno:
                    </label>
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
                    <label className="block text-gray-700">
                      Apellido Materno:
                    </label>
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

                {/* Campo Fecha de Nacimiento */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">
                      Fecha de Nacimiento:
                    </label>
                    <input
                      type="date"
                      name="fecha_nacimiento"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.fecha_nacimiento}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Sexo:</label>
                    <select
                      name="sexo"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.sexo}
                      onChange={handleChange}
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
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
                    <label className="block text-gray-700">
                      Registro Social de Hogares (RSH):
                    </label>
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
                    <label className="block text-gray-700">
                      Repetir Contraseña:
                    </label>
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

                {/* Dirección y Tipo de Domicilio */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Dirección:</label>
                    <input
                      type="text"
                      name="direccion"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      placeholder="Av. Principal 123"
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Tipo de Domicilio:
                    </label>
                    <select
                      name="tipo_domicilio"
                      className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                      value={formData.tipo_domicilio}
                      onChange={handleChange}
                    >
                      <option value="casa">Casa</option>
                      <option value="departamento">Departamento</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Foto de carnet */}
                <div className="mb-4">
                  <label className="block text-gray-700">Foto de Carnet:</label>
                  <input
                    type="file"
                    name="foto_carnet"
                    className="block w-full text-sm border-gray-300 cursor-pointer outline-none"
                    onChange={handleChange}
                  />
                </div>

                {/* Botón Registrarse */}
                <div className="flex justify-center mb-4">
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
