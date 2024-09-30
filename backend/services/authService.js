const db = require('../config/database');
const argon2 = require('argon2');
// TODO: Importar JWT para sesiones

const authUsuario = async (correo, contrasena) => {
    try {
        // Consultar si el usuario existe en la base de datos
        const [rows] = await db.promise().query(`SELECT password_hash FROM usuario WHERE email = ?`, [correo]);

        // Si no ecuentra el correo
        if (rows.length === 0) {
            return { success: false, message: 'Correo no registrado' };
        }

        // Obtener el valor en la columna password_hash
        const hash = rows[0].password_hash;

        // Verificar la contrasena con el hash almacenado
        const isPasswordValid = await argon2.verify(hash, contrasena);

        if (!isPasswordValid) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        // Aqui se debe generar el token JWT 
        // const token = generarToken(usuario);

        return { success: true, message: 'Autenticación exitosa' /*, token */ };
    } catch (error) {
        throw error; // Devuelve el error que manejara el controlador
    }
};

module.exports = { authUsuario };