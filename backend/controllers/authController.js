const db = require('../config/database');
const { registrarAdultoMayor  } = require('../services/registerMayorService');
const { authUsuario } = require('../services/authService');

class AuthController {
    constructor(){
    }

    async crearUsuario(req, res){
        //TODO: Mejorar codigos http
        try {
            const result = await registrarAdultoMayor(req.body); // Llamar servicio de registerAdultoMayor
            res.status(201).json(result);
        } catch (error) {
            console.error('Error al crear usuario:', error.message); // Mostrar el error en consola
            res.status(500).json({ error: error.message }); // Mostrar el mensaje del error en la respuesta
        }
    }
  
    async authUsuario(req,res){
        const {correo,contrasena} = req.body;
  
        // Verificar que el correo y contrasena son validos
        if (!correo || !contrasena) {
          return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }
      
        try {
            // Ejecuta la autenticacion asincrona
            const result = await authUsuario(correo, contrasena);
      
            // Si las credenciales son correctas
            if (result.success) {
                // Enviar el token en la respuesta JSON (Bearer token)
                return res.status(200).json({ // Mostrar mensaje de exito
                    message: result.message,
                    token: result.token // Incluir el token en la respuesta
                });
            } else {
                res.status(401).json({ message: result.message }); // 401: No Autorizado
            }
          
        } catch (error) {
            res.status(500).json({ error: 'Error en la autenticación' });
        }
    }
}

module.exports = new AuthController();