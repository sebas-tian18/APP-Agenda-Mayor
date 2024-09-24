const db = require('../config/database');
const argon2 = require('argon2');

class UsuariosController{
    constructor(){

    }

    consultarUsuarios(req, res){
        try{
            db.query('SELECT * FROM usuario', 
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(rows);
                });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async crearUsuario(req, res){
        try {
            const {rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento, 
                telefono, email, contrasena, sexo, nacionalidad} = req.body;

            //hashear password
            let hashedPassword;
            try {
                hashedPassword = await argon2.hash(contrasena, {  //se pueden ajustar acorde a la capacidad del server
                    type: argon2.argon2id, //version de argon2
                    memoryCost: 2 ** 16, //64MB de memoria a utilizar (2*16kb)
                    hashLength: 50, //tamano del hash producido en bytes
                    timeCost: 10,   //numero de iteraciones para reforzar
                    parallelism: 4, //numero de threads a usar
                });
            } catch (err) {
                console.error('Error al hashear la contrasena:', err);
                return res.status(500).json({ error: 'Error al procesar la contrasena' });
            }

            db.query(`INSERT INTO usuario
                (id_usuario, rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento,
                telefono, email, password_hash, sexo, nacionalidad)
                VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [rut, nombre_usuario, apellido_paterno, apellido_materno, fecha_nacimiento,
                telefono, email, hashedPassword, sexo, nacionalidad], (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(201).json({id_usuario:rows.insertId});
                });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async authUsuario(req,res){
        const {correo,contrasena} = req.body;
        try {
            // query
            const [rows] = await db.promise().query(`SELECT password_hash FROM usuario WHERE email = ?`,[correo]);

            // si no se encuentra el usuario
            if (rows.length === 0 ) {
                return res.status(404).json({ message: 'Correo no registrado' });
            }

            // obtener el hash en la tabla segun el correo ingresado
            const hash = rows[0].password_hash;
            try {
                // verificar la passwd con el hash
                if (await argon2.verify(hash, contrasena)) {
                    return res.status(200).json({ message: 'Autenticación exitosa' });
                    // TODO: generar token JWT para manejar sesion?
                } else {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
            } catch (err) {
                return res.status(500).send(err.message);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    consultarUsuario(req, res){
        const {id} = req.params;
        try{
            db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id],
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).json(rows[0]);
                });

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    actualizarUsuario(req, res){
        res.json({msg: 'Actualización de usuario'});
    }

    eliminarUsuario(req, res){
        const {id} = req.params;
        try{
            db.query('DELETE FROM usuario WHERE id_usuario = ?', [id],
                (err, rows) => {
                    if(err){
                        res.status(400).send(err);
                    }
                    if (rows.affectedRows == 1) {
                        res.status(200).json({ message: 'Usuario eliminado' });
                    }  
                })
        } catch (err) {
            res.status(500).send(err.message);            
        } 
    }

}
  module.exports = new UsuariosController();