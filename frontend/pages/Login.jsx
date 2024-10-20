import { useContext, useState } from "react";
import { FontSizeContext } from "../components/FontSizeContext.jsx";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate
import Spinner from "../components/Spinner.jsx"; // Spinner de carga :)

const Login = () => {
  const { fontSize, increaseFontSize, decreaseFontSize } =
    useContext(FontSizeContext);

  // manejar estado de correo y la contraseña
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook de navegación

  // manejar envio de formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue
  
    setLoading(true); // iniciar estado de carga
  
    try {
      // realiza POST al backend
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await response.json(); // Convertir respuesta a JSON

      if (response.ok && data.token) {
        const token = data.token; // Token que viene en la respuesta
        sessionStorage.setItem("token", token); // Guardar el token en sessionStorage
        toast.success("Autenticacion exitosa!");
        // TODO: redirigir usuario (Manejar Rutas Protegidas react-router)

        // Redirige a la página de Home
        navigate("/Home");

      } else {
        setError(data.message); // Manejar error si credenciales son incorrectas
        toast.warning(data.message || "Error al autenticar usuario");
      }
    } catch (err) {
      toast.error(err.message || "Error al Autenticar.");

    } finally {
      setLoading(false); // Termina carga
    }

  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/picsum/1920/1080')",
        fontSize: `${fontSize}px`,
      }}
    >
      <div className="flex-grow bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white shadow-2xl w-full max-w-4xl rounded-lg flex">
          <div className="hidden md:block bg-gradient-to-b from-emerald-500 to-blue-500 w-1/3 rounded-l-lg"></div>

          <div
            className="w-full md:w-2/3 p-10"
            style={{ fontSize: `${fontSize}px` }}
          >
            <h2 className="font-bold mb-10 text-center">
              Ingresar a la plataforma
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Campo de Correo */}
              <div className="mb-8">
                <label className="block text-gray-700">Correo:</label>
                <input
                  type="email"
                  name="correo"
                  onChange={(e) => setCorreo(e.target.value)} // Maneja el cambio
                  className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              {/* Campo de Contraseña */}
              <div className="mb-8">
                <label className="block text-gray-700">Contraseña:</label>
                <input
                  type="password"
                  name="contrasena"
                  onChange={(e) => setContrasena(e.target.value)} // Maneja el cambio
                  className="w-full my-1 border-b-2 border-[#FF5100] outline-none"
                  placeholder="***************"
                />
              </div>

              {/* Enlaces */}
              <div className="flex justify-between items-center mb-10">
                <Link to="/register" className="text-blue-500 hover:underline">
                  No tengo una cuenta
                </Link>
                <Link to="#" className="text-blue-500 hover:underline">
                  Recuperar contraseña
                </Link>
              </div>

              {/* Botón de Iniciar sesión */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-full md:w-auto bg-blue-500 text-white inline-flex items-center 
                    rounded-lg p-4 focus:ring-4 hover:bg-blue-700`}
                  disabled={loading}
                >
                  {/* Logica del Spinner y Carga*/}
                  {loading ? (
                    <>
                      <Spinner />
                      Cargando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>

            {/* Botones para aumentar y disminuir el tamaño de la fuente */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                onClick={decreaseFontSize}
              >
                -
              </button>
              <button
                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                onClick={increaseFontSize}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
