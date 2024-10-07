const jwt = require('jsonwebtoken');
const { verificarToken } = require('../services/jwtService');

// Verifica si el toquen es recibido y es valido

function verifyToken(req, res, next) {
    const token = req.cookies.token; // Obtener el token desde la cookie
  
    if (!token) {
      return res.status(401).json({ message: "Token no recibido" });
    }
  
    try {
      const payload = verificarToken(token); // Verificar el token
      req.username = payload.username; // Guardar payload en req
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token no válido" });
    }
  }

module.exports = { verifyToken };