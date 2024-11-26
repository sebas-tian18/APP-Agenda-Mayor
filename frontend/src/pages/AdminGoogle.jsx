import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; // importar hook para contexto global

function AdminGoogle() {
  const { userId } = useAuth(); // Obtener el ID del usuario desde el contexto
  const [googleLinked, setGoogleLinked] = useState(false);

  useEffect(() => {
    verificarCuentaVinculada();
  }, []);

  const verificarCuentaVinculada = async () => {
    const token = sessionStorage.getItem("token"); // Obtener JWT desde sessionStorage

    try {
      const response = await fetch("http://localhost:3000/google/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al verificar Google");
      }

      const data = await response.json();
      setGoogleLinked(data.vinculada); // Actualizar el estado
    } catch (error) {
      console.error("Error al verificar la cuenta de Google:", error);
    }
  };

  const vincularGoogle = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/google/auth-url", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener la URL de autenticación de Google");
      }
  
      const data = await response.json();
      window.open(data.authUrl, "_blank", "width=500,height=700");
    } catch (error) {
      console.error("Error al vincular Google:", error);
    }
  };

  const desvincularGoogle = async () => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/google/unlink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const message = await response.text();
  
      if (!response.ok) {
        throw new Error(message || "Error al desvincular Google");
      }
  
      setGoogleLinked(false);
      alert(message); // Muestra el mensaje enviado desde el backend
    } catch (error) {
      console.error("Error al desvincular la cuenta de Google:", error);
      alert(
        "No se pudo desvincular la cuenta completamente. Por favor, intenta nuevamente."
      );
    }
  };

  const exportarCitas = async () => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/google/export-citas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al exportar las citas");
      }
  
      alert("Citas exportadas exitosamente a Google Calendar.");
    } catch (error) {
      console.error("Error al exportar citas a Google Calendar:", error);
      alert(error.message);
    }
  }

  return (
        <div className="bg-white p-6 rounded-lg shadow">
      {googleLinked ? (
        <div>
          <p className="mb-4">Actualmente tienes una cuenta de Google vinculada.</p>
          <button
            onClick={exportarCitas}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
          >
            Exportar citas a Google Calendar
          </button>
          <button
            onClick={desvincularGoogle}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150"
          >
            Desvincular cuenta de Google
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">No tienes ninguna cuenta de Google vinculada.</p>
          <button
            onClick={vincularGoogle}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150"
          >
            Vincular cuenta de Google
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminGoogle;
