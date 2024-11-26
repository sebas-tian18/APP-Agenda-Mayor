import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

function Ajustes() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Ajustes</h1>
        
        <div className="space-y-6">
          <Link to="/editar-perfil" className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition duration-150 ease-in-out">
            <div className="flex items-center">
              <User size={24} />
              <span className="ml-4">Editar perfil</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Ajustes