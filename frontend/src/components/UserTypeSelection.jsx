import { Link } from 'react-router-dom';

function UserTypeSelection() {
  return (
    <div className="min-h-screen bg-green-50">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Seleccionar Tipo de Usuario
            </h2>
            <div className="space-y-4">
                <Link
                to="/crear-admin"
                className="block w-full text-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                Crear Administrador
                </Link>
                <Link
                to="/crear-profesional"
                className="block w-full text-center bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                Crear Profesional
                </Link>
            </div>
            </div>
        </div>
    </div>
  );
}

export default UserTypeSelection;