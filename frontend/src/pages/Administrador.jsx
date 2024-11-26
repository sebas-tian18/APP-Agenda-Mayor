import React, { useState } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';

const mockUsers = [
  {
    id: 1,
    rut: '12.345.678-9',
    nombre: 'Juan',
    apellido: 'Pérez',
    fechaNacimiento: '1990-05-15',
    fotoRSH: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    fotoDNI: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    rut: '98.765.432-1',
    nombre: 'María',
    apellido: 'González',
    fechaNacimiento: '1985-10-20',
    fotoRSH: 'https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    fotoDNI: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

function App() {
  const [users, setUsers] = useState(mockUsers);

  const handleValidation = (id, isValid) => {
    setUsers(users.filter(user => user.id !== id));
    // Aquí se podría agregar la lógica para enviar la validación al backend
    console.log(`Usuario ${id} ${isValid ? 'aceptado' : 'rechazado'}`);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">Panel de Validación de Usuarios</h1>
      </header>
      <main className="container mx-auto p-4">
        {users.length === 0 ? (
          <p className="text-center text-green-800 text-xl mt-10">No hay más usuarios para validar.</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-green-800">{user.nombre} {user.apellido}</h2>
                  <p className="text-green-600">RUT: {user.rut}</p>
                  <p className="text-green-600">Fecha de Nacimiento: {user.fechaNacimiento}</p>
                </div>
                <div className="w-full md:w-1/2 flex justify-end space-x-4">
                  <button
                    onClick={() => handleValidation(user.id, true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <Check className="mr-2" /> Aceptar
                  </button>
                  <button
                    onClick={() => handleValidation(user.id, false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <X className="mr-2" /> Rechazar
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Registro Social de Hogares</h3>
                  <a
                    href={user.fotoRSH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 text-green-700 py-2 px-4 rounded inline-flex items-center hover:bg-green-200 transition-colors"
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Ver documento
                  </a>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Carnet de Identidad</h3>
                  <a
                    href={user.fotoDNI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 text-green-700 py-2 px-4 rounded inline-flex items-center hover:bg-green-200 transition-colors"
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Ver documento
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;