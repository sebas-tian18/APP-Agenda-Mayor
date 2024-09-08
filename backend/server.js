const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');


app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
