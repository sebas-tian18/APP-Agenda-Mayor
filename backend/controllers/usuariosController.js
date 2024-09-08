const Usuarios = require('../models/usuarios');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
