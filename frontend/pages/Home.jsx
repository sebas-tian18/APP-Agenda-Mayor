import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a MiApp</h1>
      <div className="flex space-x-4">
        <Link to="/servicios">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Citas</button>
        </Link>
        <Link to="/calendario">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Calendario</button>
        </Link>
        <Link to="/ajustes">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Ajustes</button>
        </Link>
        <Link to="/Login">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;