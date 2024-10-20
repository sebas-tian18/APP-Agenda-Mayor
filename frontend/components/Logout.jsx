import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

const cerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Eliminar el token del sessionStorage
    toast.success('Sesión cerrada exitosamente');
    navigate('/login'); // Redirigir al login
  };

  return (
    <button
        onClick={handleLogout}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-150 ease-in-out"
    >
              <LogOut size={20} className="mr-1" />
              Cerrar sesión
    </button>
  );
};

export default cerrarSesion;