const db = require('../config/database');
const { hashPassword } = require('../utils/passwordUtils');

// Contiene logica para registrar los datos de los adultos mayores

const registrarAdultoMayor = async (userData) => {

  const connection = db.promise();
    
  try {
      rsh_valido = false;
      // Comprobar si el correo esta registrado
      const [existeUsuario] = await connection.query(`
        SELECT * 
        FROM usuario 
        WHERE email = ? OR rut = ?`, 
        [userData.email, userData.rut]
      );

      if (existeUsuario.length > 0 ) {
        throw new Error('El correo o rut ya está registrado.'); //TODO: Se podria separar un error para Correo y otro Rut?
      }

      // Hashear la contrasena (llamar)
      const hashedPassword = await hashPassword(userData.contrasena);

      // Iniciar la transaccion (si falla una query se cancela)
      await connection.beginTransaction();

      // Insertar en la tabla `usuario`

      const ID_ROL_ADULTO_MAYOR = 3; // 1 = admin, 2 = profesional, 3 = adulto_mayor

      const [resultUsuario] = await connection.query(`
        INSERT INTO usuario 
          (id_usuario, rut, nombre_usuario, apellido_paterno, apellido_materno, 
          fecha_nacimiento, telefono, email, password_hash, sexo, nacionalidad, id_rol)
        VALUES 
          (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [ userData.rut, userData.nombre_usuario, userData.apellido_paterno, 
          userData.apellido_materno, userData.fecha_nacimiento, userData.telefono, 
          userData.email, hashedPassword, userData.sexo, userData.nacionalidad, ID_ROL_ADULTO_MAYOR ]);

      const id_usuario = resultUsuario.insertId; // Obtener id del nuevo usuario

      // Insertar en la tabla `direccion`
      const [resultDireccion] = await connection.query(`
        INSERT INTO direccion
          (id_direccion, calle, numero, nombre_sector, tipo_domicilio, zona_rural) 
        VALUES (NULL, ?, ?, ?, ?, ?)`, 
          [ userData.calle, userData.numero ,userData.nombre_sector, userData.tipo_domicilio, userData.zona_rural]);

      const id_direccion = resultDireccion.insertId; // Obtener id de la nueva direccion

      // Calcular la edad //mover a utils
      const fechaNacimiento = new Date(userData.fecha_nacimiento);  // Obtener fecha nacimiento
      const fechaHoy = new Date();
      var edadCalculada = fechaHoy.getFullYear() - fechaNacimiento.getFullYear(); // Calcular edad segun año
      const mes = fechaHoy.getMonth() - fechaNacimiento.getMonth(); // Restar mes actual con mes de nacimiento
      if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) { // Comparar fechas
        edadCalculada--;
      }

      console.log(edadCalculada);

      // Insertar en la tabla `adulto_mayor`
      await connection.query(`
        INSERT INTO adulto_mayor 
          (id_adulto_mayor, id_usuario, id_direccion, edad, rsh_valido, problemas_movilidad)
        VALUES 
          (NULL, ?, ?, ?, ?, ?)`,
        [id_usuario, id_direccion, edadCalculada, userData.rsh_valido, userData.problemas_movilidad]);

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

module.exports = { registrarAdultoMayor };
