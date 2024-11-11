import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Obtener el token desde session
    if (token) {
      try {
        const user = jwtDecode(token); // Decodificar el token
        const currentTime = Date.now() / 1000; // Convertir a segundos (unix time)
        if (user.exp < currentTime) { // Verificar si el token ha expirado
          logout(); // Si el token expira cierra sesion
        } else {
          setIsAuthenticated(true);
          setUserRole(user.nombre_rol); // Obtener el rol desde el token decodificado
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        logout(); // Cerrar sesión si ocurre un error al decodificar
      }
    }
  }, []);

  const login = (token) => {
    // Guardar el token en sessionStorage
    sessionStorage.setItem("token", token);
    // Decodificar el token para obtener la informacion del usuario
    const decodedToken = jwtDecode(token);
    const role = decodedToken.nombre_rol; // Obtener rol

    // Configurar el estado global de autenticacion y el rol
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}