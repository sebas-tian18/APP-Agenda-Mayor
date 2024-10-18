const jwt = require('jsonwebtoken');
const { verificarToken } = require('../services/jwtService');

// Verifica si el toquen es recibido y es valido

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; // Obtener el token del header ('Bearer <token>')
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token no recibido o formato inválido" });
    }
    
    const token = authHeader.split(' ')[1]; // Extraer el token despues de 'Bearer '
  
    try {
        const payload = verificarToken(token); // Verificar el token
        req.username = payload.username; // Guardar payload en req
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token no válido" });
    }
  }

module.exports = { verifyToken };