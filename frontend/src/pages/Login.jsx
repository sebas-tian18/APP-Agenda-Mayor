import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontSizeContext } from "../components/FontSizeContext.jsx";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import Spinner from "../components/Spinner.jsx"; // Spinner de carga :)

const Login = () => {
  const { fontSize, increaseFontSize, decreaseFontSize } =
    useContext(FontSizeContext);
  const { login } = useContext(AuthContext); // Acceder a funcion login desde AuthContext

  // manejar estado de correo y la contraseña
  const [credencial, setCredencial] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook de navegación

  // manejar envio de formulariow
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue

    setLoading(true); // iniciar estado de carga

    try {
      // realiza POST al backend
      const response = await fetch("http://45.236.130.139:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credencial,
          contrasena,
        }),
      });

      const data = await response.json(); // Convertir respuesta a JSON

      if (response.ok && data.token) {
        const token = data.token; // Token que viene en la respuesta
        login(token); // Llama a la funcion login del contexto con el token
        navigate("/home"); // Redirige al usuario a Home
        toast.success("¡Autenticación exitosa!");
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
                <label className="block text-gray-700">Correo o RUT:</label>
                <input
                  type="text"
                  name="credencial"
                  onChange={(e) => setCredencial(e.target.value)} // Maneja el cambio
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
