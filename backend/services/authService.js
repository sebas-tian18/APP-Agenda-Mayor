const db = require('../config/database');
const argon2 = require('argon2');
const { generarToken } = require('./jwtService'); // Importar la funcion para generar jwt
const errors = require('../utils/errors');

// Este servicio autentica al usuario en el login

const authUsuario = async (correo, contrasena) => {
    // Obtener los datos que se enviaran en el payload del JWT 
    const [rows] = await db.promise().query(`
        SELECT u.id_usuario, u.password_hash, u.nombre_usuario, r.nombre_rol
        FROM usuario u
        JOIN rol r ON u.id_rol = r.id_rol 
        WHERE u.email = ?`,
        [correo]);

    // Si no ecuentra el correo
    if (rows.length === 0) {
        throw errors.NotFoundError('Correo no registrado');
    }

    // Obtener los valores de las columnas necesarias
    const { id_usuario, nombre_usuario, nombre_rol, password_hash, id_adulto_mayor } = rows[0];

    // Verificar la contrasena con el hash almacenado
    const isPasswordValid = await argon2.verify(password_hash, contrasena);
    if (!isPasswordValid) {
        throw errors.UnauthorizedError('Contraseña incorrecta');
    }

    // Generar el token JWT con los datos necesarios
    const token = generarToken({ id_usuario, nombre_usuario, nombre_rol, id_adulto_mayor });

    // Retornar el token junto a un mensaje de exito
    return {
        message: 'Autenticación exitosa', 
        token 
    };
};

module.exports = { authUsuario };