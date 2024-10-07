// crea y estructura el JWT
const jwt = require('jsonwebtoken');

const generarToken = (datosUsuario) => {
  return jwt.sign(datosUsuario, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = { generarToken, verificarToken };