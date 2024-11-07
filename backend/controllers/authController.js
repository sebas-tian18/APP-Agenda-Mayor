const db = require('../config/database');
const { registrarAdultoMayor  } = require('../services/registerMayorService');
const { registrarAdmin } = require('../services/registerAdminService');
const { registrarProfesional } = require('../services/registerProfesService');
const { authUsuario } = require('../services/authService');

class AuthController {
    constructor(){
    }

    async crearUsuario(req, res){
        //TODO: Mejorar codigos http
        const result = await registrarAdultoMayor(req.body); // Llamar servicio de registerAdultoMayor
        res.status(201).json(result);
    }

    async crearAdmin(req, res){
        const result = await registrarAdmin(req.body); // Servicio registerAdmin
        res.status(201).json(result);
        
    }

    async crearProfesional(req, res){
        const result = await registrarProfesional(req.body); // Servicio registerProfesional
        res.status(201).json(result);
    }

    async authUsuario(req,res){
        const {correo,contrasena} = req.body;
  
        // Verificar que el correo y contrasena son validos
        if (!correo || !contrasena) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }
            
        // Ejecuta la autenticacion asincrona
        const result = await authUsuario(correo, contrasena);

        // Si las credenciales son correctas
        if (result.success) {
            // Enviar el token en la respuesta JSON (Bearer token)
            return res.status(200).json({
                message: result.message, // Mensaje de exito
                token: result.token      // Incluir el token en la respuesta
            });
        } else {
            // Envia el mensaje de error con el codigo de estado
            res.status(401).json({ message: result.message }); // 401: No Autorizado
        }
    }
}

module.exports = new AuthController();