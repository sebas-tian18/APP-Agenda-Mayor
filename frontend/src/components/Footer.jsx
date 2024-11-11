import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4">
      <div className="container mx-auto text-center">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} Municipalidad de temuco. Todos los derechos reservados.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/about" className="text-gray-400 hover:text-white">Acerca de</a>
          </li>
          <li>
            <a href="/contact" className="text-gray-400 hover:text-white">Contacto</a>
          </li>
          <li>
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacidad</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;