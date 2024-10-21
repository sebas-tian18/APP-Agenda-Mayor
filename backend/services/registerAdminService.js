const db = require('../config/database');
const { hashPassword } = require('../utils/passwordUtils');

// Contiene logica para registrar los datos de los admins

const registrarAdmin = async (userData) => {

  const connection = db.promise();
    
  try {
      // Comprobar si el correo esta registrado
      const [existeUsuario] = await connection.query(`
        SELECT * 
        FROM usuario 
        WHERE email = ? OR rut = ?`, 
        [userData.email, userData.rut]
      );

      if (existeUsuario.length > 0 ) {
        throw new Error('El correo o rut ya está registrado.'); 
      }

      // Hashear la contrasena (llamar)
      const hashedPassword = await hashPassword(userData.contrasena);

      // Iniciar la transaccion (si falla una query se cancela)
      await connection.beginTransaction();

      const ID_ROL_ADMIN = 1; // 1 = admin
      
      // Insertar en la tabla `usuario`
      const [resultUsuario] = await connection.query(`
        INSERT INTO usuario 
          (id_usuario, rut, nombre_usuario, apellido_paterno, apellido_materno, 
          fecha_nacimiento, telefono, email, password_hash, sexo, nacionalidad, id_rol)
        VALUES 
          (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [ userData.rut, userData.nombre_usuario, userData.apellido_paterno, 
          userData.apellido_materno, userData.fecha_nacimiento, userData.telefono, 
          userData.email, hashedPassword, userData.sexo, userData.nacionalidad, ID_ROL_ADMIN ]);

      const id_usuario = resultUsuario.insertId; // Obtener id del usuario creado

      // Insertar en la tabla `administrador`
      await connection.query(`
        INSERT INTO administrador 
          (id_administrador, id_usuario, id_cargo)
        VALUES 
          (NULL, ?, ?)`,
        [ id_usuario, userData.id_cargo ]);

      // Confirmar transaccion
      await connection.commit();
      
      // Retornar el id del usuario creado
      return { id_usuario }; 
      
  } catch (error) {
      // Si ocurre error hacer rollback
      console.log(error);
      await connection.rollback();
      throw error; // Lanzar el error para que el controlador lo maneje
  }
};

module.exports = { registrarAdmin };
