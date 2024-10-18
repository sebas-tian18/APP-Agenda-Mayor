import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clipboard, Settings, LogOut, CalendarCog, LogIn } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">MiApp</span>
          </div>
          <div className="flex">
            <NavItem to="/servicios" icon={<Clipboard size={20} />} text="Citas" />
            <NavItem to="/calendario" icon={<Calendar size={20} />} text="Calendario" />
            <NavItem to="/administrar" icon={<CalendarCog size={20} />} text="Administrar" />
            <NavItem to="/ajustes" icon={<Settings size={20} />} text="Ajustes" />
            

            <button
              onClick={() => console.log('Cerrar sesión')}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-150 ease-in-out"
            >
              <LogOut size={20} className="mr-1" />
              Cerrar sesión
            </button>
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
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-150 ease-in-out"
    >
      {icon}
      <span className="ml-1">{text}</span>
    </Link>
  );
}

export default Navbar;