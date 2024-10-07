const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const app = express();
const usuariosRoutes = require('./routes/usuariosRoutes.js');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
