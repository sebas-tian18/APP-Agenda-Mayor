const argon2 = require('argon2');

const hashPassword = async (password) => { //se pueden ajustar acorde a la capacidad del server
    return await argon2.hash(password, {
      type: argon2.argon2id, //version de argon2
      memoryCost: 2 ** 16, //64MB de memoria a utilizar (2*16kb)
      hashLength: 50, //tamano del hash producido en bytes
      timeCost: 10,   //numero de iteraciones para reforzar
      parallelism: 4, //numero de threads a usar
    });
};

module.exports = { hashPassword };