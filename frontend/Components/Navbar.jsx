import React from "react";
import { Link } from "react-router-dom"; // Importa Link

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Logo</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white text-lg font-bold hover:text-gray-300">Inicio</Link></li>
          <li><Link to="/login" className="text-white text-lg font-bold hover:text-gray-300">Login</Link></li>
          <li><Link to="/register" className="text-white text-lg font-bold hover:text-gray-300">Registro</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;