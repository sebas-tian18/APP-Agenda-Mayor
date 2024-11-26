import { Link } from 'react-router-dom';
import { Calendar, Clipboard, Settings, CalendarCog, LogIn, UserPlus, UserRound, Mail, UserRoundPlus, UserRoundCheck } from 'lucide-react';
import CerrarSesion from './Logout';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { FontSizeContext } from "../components/FontSizeContext.jsx";
import logo from '../images/Logo2.png'; // Importa tu imagen (ajusta el nombre y la ruta según corresponda)

function Navbar() {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const { fontSize, increaseFontSize, decreaseFontSize, midsetFontsize } = useContext(FontSizeContext);

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo con redirección */}
          <div className="flex items-center">
            <a href="https://www.temuco.cl" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Logo Municipalidad de Temuco" className="w-20 h-auto" />
            </a>
          </div>

          <div className="flex">
            {isAuthenticated ? (
              <>
                {userRole === 'admin' && (
                  <>
                    <NavItem to="/ver-usuarios" icon={<UserRound size={20} />} text="Ver Usuarios" />
                    <NavItem to="/administrador" icon={<UserRoundCheck size={20} />} text="Validación Usuarios" />
                    <NavItem to="/crear-usuario" icon={<UserRoundPlus size={20} />} text="Crear Usuario" />
                    <NavItem to="/" icon={<Mail size={20} />} text="Solicitudes" />
                  </>
                )}
                {userRole === "profesional" && (
                  <>
                    <NavItem to="/ViewCalendar" text="ViewCalendar" />
                    <NavItem to="/crear-cita" icon={<Clipboard size={20} />} text="Crear Cita" />
                  </>
                )}
                {userRole === "adulto mayor" && (
                  <>
                    <NavItem to="/servicios" icon={<Clipboard size={20} />} text="Citas" />
                    <NavItem to="/calendario" icon={<Calendar size={20} />} text="Calendario" />
                    <NavItem to="/citas" icon={<CalendarCog size={20} />} text="Administrar" />
                    <NavItem to="/ajustes" icon={<Settings size={20} />} text="Ajustes" />
                    <NavItem to="/ViewCalendar" text="ViewCalendar" />
                  </>
                )}

                <CerrarSesion />
              </>
            ) : (
              <>
                <NavItem to="/register" icon={<UserPlus size={20} />} text="Registrarse" />
                <NavItem to="/login" icon={<LogIn size={20} />} text="Acceder" />
              </>
            )}
          </div>
            </div>
        </div>
    </nav>
  );
}

function NavItem({ to, icon, text }) {
  const { fontSize } = useContext(FontSizeContext);

  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 
      transition duration-150 ease-in-out"
    >
      {icon}
      <span className="ml-1" style={{ fontSize: `${fontSize}px` }}>{text}</span>
    </Link>
  );
}

export default Navbar;
