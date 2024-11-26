import React from 'react'
import { Link } from 'react-router-dom'
import { User, Lock, Sliders, Settings } from 'lucide-react';

function Ajustes() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Ajustes</h1>
        
        <div className="space-y-6">
          {/* Editar perfil */}
          <Link to="/editar-perfil" className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition duration-150 ease-in-out">
            <div className="flex items-center">
              <User size={24} />
              <span className="ml-4">Editar perfil</span>
            </div>
          </Link>

          {/* Cambiar contrasena */}
          <Link
            to="/cambiar-contrasena"
            className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition duration-150 ease-in-out"
          >
            <div className="flex items-center">
              <Lock size={24} />
              <span className="ml-4">Cambiar contraseña</span>
            </div>
          </Link>

          {/* Preferencias */}
          <Link
            to="/preferencias"
            className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition duration-150 ease-in-out"
          >
            <div className="flex items-center">
              <Sliders size={24} />
              <span className="ml-4">Preferencias</span>
            </div>
          </Link>

          {/* Administrar cuenta de Google */}
          <Link
            to="/administrar-google"
            className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition duration-150 ease-in-out"
          >
            <div className="flex items-center">
              <Settings size={24} />
              <span className="ml-4">Administrar cuenta de Google</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Ajustes