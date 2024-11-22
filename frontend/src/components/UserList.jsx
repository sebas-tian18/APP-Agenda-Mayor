import { useState } from 'react';
import {Trash2} from 'lucide-react'
import DeleteConfirmModal from './DeleteConfirmModal';
import { Link } from 'react-router-dom';

function UserList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Mock data - replace with actual data from your backend
  const [users] = useState([
    {
      id: 1,
      nombreUsuario: 'juan.perez',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'García',
      rut: '12.345.678-9',
      tipo: 'Administrador',
      nombreCargo: 'Gerente General'
    },
    {
      id: 2,
      nombreUsuario: 'maria.rodriguez',
      apellidoPaterno: 'Rodríguez',
      apellidoMaterno: 'López',
      rut: '98.765.432-1',
      tipo: 'Profesional'
    }
  ]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    console.log('Deleting user:', userToDelete);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen bg-green-50">
    <div className="container mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-green-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-800">Lista de Usuarios</h2>
          <Link
            to="/"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Crear Nuevo Usuario
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">Usuario</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">Apellidos</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">RUT</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">Cargo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-green-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-green-50">
                <td className="px-6 py-4 text-sm text-gray-700">{user.nombreUsuario}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.apellidoPaterno} {user.apellidoMaterno}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.rut}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.nombreCargo || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="mx-5">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.nombreUsuario}
      />
    </div>
    </div>
    </div>
  );
}

export default UserList;