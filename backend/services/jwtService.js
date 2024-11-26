const jwt = require('jsonwebtoken');

// Este servicio crear y verifica el JWT

// Genera el JWT agregando los datos seleccionados al payload
const generarToken = (datosUsuario) => {
  return jwt.sign(datosUsuario, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verifica la validez del token mediante la firma
const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = { generarToken, verificarToken };