import { Link } from "react-router-dom";
import {
  Calendar,
  Clipboard,
  Settings,
  CalendarCog,
  LogIn,
  UserPlus,
  UserRound,
  Mail,
  UserRoundPlus,
  UserRoundCheck,
} from "lucide-react";
import CerrarSesion from "./Logout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { isAuthenticated, userRole } = useContext(AuthContext); // Obtener estados globales

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">MiApp</span>
          </div>
          <div className="flex">
            {isAuthenticated ? (
              <>
                {/* Elementos visibles solo para usuarios autenticados segun rol */}
                {userRole === "admin" && (
                  <>
                    <NavItem
                      to="/ver-usuarios"
                      icon={<UserRound size={20} />}
                      text="Ver Usuarios"
                    />
                    <NavItem
                      to="/administrador"
                      icon={<UserRoundCheck size={20} />}
                      text="Validacion Usuarios"
                    />
                    <NavItem
                      to="/crear-usuario"
                      icon={<UserRoundPlus size={20} />}
                      text="Crear Usuario"
                    />
                    <NavItem
                      to="/"
                      icon={<Mail size={20} />}
                      text="Solucitudes"
                    />
                  </>
                )}
                {userRole === "profesional" && (
                  <>
                    <NavItem
                      to="/ViewCalendar"
                      icon={<Calendar size={20} />}
                      text="Calendario"
                    />
                    <NavItem
                      to="/crear-cita"
                      icon={<Clipboard size={20} />}
                      text="Crear Cita"
                    />
                    {/*Elementos del profesional*/}
                  </>
                )}
                {userRole === "adulto mayor" && (
                  <>
                    {/*Elementos del adulto mayor*/}
                    <NavItem
                      to="/servicios"
                      icon={<Clipboard size={20} />}
                      text="Citas"
                    />
                    <NavItem
                      to="/calendario"
                      icon={<Calendar size={20} />}
                      text="Calendario"
                    />
                    <NavItem
                      to="/citas"
                      icon={<CalendarCog size={20} />}
                      text="Administrar"
                    />
                    <NavItem
                      to="/ajustes"
                      icon={<Settings size={20} />}
                      text="Ajustes"
                    />
                  </>
                )}
                {/* Boton de cierre de sesion para todos los roles */}
                <CerrarSesion />
              </>
            ) : (
              <>
                {/* Elementos visibles solo para usuarios no autenticados */}
                <NavItem
                  to="/register"
                  icon={<UserPlus size={20} />}
                  text="Registrarse"
                />
                <NavItem
                  to="/login"
                  icon={<LogIn size={20} />}
                  text="Acceder"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 
      transition duration-150 ease-in-out"
    >
      {icon}
      <span className="ml-1">{text}</span>
    </Link>
  );
}

export default Navbar;
