const db = require('../config/database');
const { registrarAdultoMayor  } = require('../services/registerMayorService');
const { registrarAdmin } = require('../services/registerAdminService');
const { registrarProfesional } = require('../services/registerProfesService');
const { authUsuario } = require('../services/authService');
const errors = require('../utils/errors');

class AuthController {
    constructor(){
    }

    async crearUsuario(req, res){
        const result = await registrarAdultoMayor(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async crearAdmin(req, res){
        const result = await registrarAdmin(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async crearProfesional(req, res){
        const result = await registrarProfesional(req.body);
        res.status(201).json({
            success: true,
            ...result
        });
    }

    async authUsuario(req,res){
        const {correo,contrasena} = req.body;

        // Verificar que el correo y contrasena son validos
        if (!correo || !contrasena) {
            throw errors.BadRequestError('Correo y contraseña son requeridos');
        }

        // Ejecuta el servicio de autenticacion
        const result = await authUsuario(correo, contrasena);

        // Enviar respuesta en caso de exito
        return res.status(200).json({
            success: true,
            message: result.message,  // Mensaje de éxito
            token: result.token       // Token de autenticación
        });
    }
}

module.exports = new AuthController();