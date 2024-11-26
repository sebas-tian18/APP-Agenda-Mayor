import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); 

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
          setUserId(user.id_usuario); // Obtener id usuario
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
    const user_id = decodedToken.id_usuario;

    // Configurar el estado global de autenticacion, el rol e id
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(user_id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}