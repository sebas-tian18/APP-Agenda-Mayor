const jwt = require('jsonwebtoken');
const { verificarToken } = require('../services/jwtService');

// Verifica si el toquen es recibido y es valido

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; // Obtener el token del header ('Bearer <token>')
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token no recibido o formato no valido" });
    }
    
    const token = authHeader.split(' ')[1]; // Extraer el token despues de 'Bearer '
  
    try {
        const payload = verificarToken(token); // Verificar el token
        req.username = payload; // Guardar payload en req
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                return res.status(401).json({ message: "Token expirado" });
            case 'JsonWebTokenError':
                return res.status(403).json({ message: "Token no válido" });
            default:
                return res.status(500).json({ message: "Error al verificar el token" });
        }
    }
  }

module.exports = { verifyToken };