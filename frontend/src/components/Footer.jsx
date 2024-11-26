import React from "react";
import temucoLogo from "../images/LOGO.png"; // Reemplaza "tu-imagen.png" con el nombre del archivo de tu imagen

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Columna izquierda: Información general */}
        <div className="flex-1 mb-6 md:mb-0">
          <h4 className="text-lg font-bold">MUNICIPALIDAD DE TEMUCO</h4>
          <p className="text-sm mt-2">Av. Prat 650, Temuco - Chile</p>
          <p className="text-sm mt-2">
            <strong>Teléfonos:</strong>
            <br />
            Municipal: 800 100 650 <br />
            Salud: 45 297 3630 <br />
            Educación: 45 297 3771
          </p>
        </div>

        {/* Columna derecha: Email */}
        <div className="flex-1 md:ml-6">
          <p className="text-sm mt-2">
            <strong>Email:</strong>
            <br />
            <a href="mailto:municto@temuco.cl" className="hover:underline">
              municto@temuco.cl
            </a>{" "}
            (correo oficial)
            <br />
            <a href="mailto:webmaster@temuco.cl" className="hover:underline">
              webmaster@temuco.cl
            </a>{" "}
            (exclusivo para temas técnicos y de contenido)
          </p>
        </div>

        {/* Imagen del logo */}
        <div className="flex justify-center items-center md:ml-6">
          <img src={temucoLogo} alt="Logo Municipalidad de Temuco" className="w-32 h-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;