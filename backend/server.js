const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors'); // Permite no usar try-catch para errores en funciones asincronas

const app = express();
const usuariosRoutes = require('./routes/usuariosRoutes.js');
const citasRoutes = require('./routes/citasRoutes.js');
const publicRoutes = require('./routes/publicRoutes.js');
const registerRoutes = require('./routes/registerRoutes.js');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas publicas
app.use("/api", publicRoutes); // login y register estan aqui

// Rutas privadas
app.use("/api/usuarios", usuariosRoutes); // Conjunto de endpoints para CRUD de usuarios
app.use("/api/citas", citasRoutes);       // Conjunto de endpoints para CRUD de citas
app.use("/api", registerRoutes);          // Registro para admin y profesional

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
