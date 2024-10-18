const db = require('../config/database');
const argon2 = require('argon2');
const { generarToken } = require('./jwtService'); // Importar la funcion para generar jwt

const authUsuario = async (correo, contrasena) => {
    try {
        // Consultar si el usuario existe en la base de datos
        const [rows] = await db.promise().query(`SELECT id_usuario, password_hash, id_rol, nombre_usuario FROM usuario WHERE email = ?`, [correo]);

        // Si no ecuentra el correo
        if (rows.length === 0) {
            return { success: false, message: 'Correo no registrado' };
        }

        // Obtener los valores de las columnas necesarias
        const { id_usuario, password_hash, id_rol, nombre_usuario } = rows[0];

        // Verificar la contrasena con el hash almacenado
        const isPasswordValid = await argon2.verify(password_hash, contrasena);
        if (!isPasswordValid) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        // Generar el token JWT con los datos necesarios
        const token = generarToken({ id_usuario, id_rol, nombre_usuario });
        
        // Retornar el token junto a un mensaje de exito
        return { success: true, message: 'Autenticación exitosa', token: token };
    } catch (error) {
        throw error; // Devuelve el error que manejara el controlador
    }
};

module.exports = { authUsuario };