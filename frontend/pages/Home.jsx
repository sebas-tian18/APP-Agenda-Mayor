import React, { useEffect, useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('');  // Estado para almacenar el nombre de usuario

  // Función para decodificar manualmente el token JWT
  const decodeJWT = (token) => {
    try {
      // Divide el token en las tres partes y toma la segunda parte (el payload)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);  // Retorna el payload como objeto JSON
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  useEffect(() => {
    // Intenta obtener el token de sessionStorage
    const token = sessionStorage.getItem('token');

    console.log('Token desde sessionStorage:', token);  // Verifica si el token se obtiene correctamente

    if (token) {
      const decoded = decodeJWT(token);  // Decodifica el token manualmente
      if (decoded && decoded.nombre_usuario) {
        setUsername(decoded.nombre_usuario);  // Establece el nombre de usuario si está presente
        console.log('Nombre de usuario:', decoded.nombre_usuario);  // Verifica que el campo se esté obteniendo correctamente
      } else {
        console.error('El token no contiene el campo "nombre_usuario" o la decodificación falló.');
      }
    } else {
      console.log('No se encontró token en sessionStorage.');
    }
  }, []);  // Ejecuta solo una vez al montar el componente

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Bienvenido(a){username ? `, ${username}` : ' '} a la página principal
      </h1>
    </div>
  );
};

export default Home;