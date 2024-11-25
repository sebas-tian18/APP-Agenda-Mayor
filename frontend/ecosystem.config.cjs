module.exports = {
  apps: [
    {
      name: "frontend", // Nombre de la aplicación
      script: "npm", // Ejecuta un comando npm
      args: "run dev -- --host", // Argumentos para el comando npm
      watch: false, // No observar cambios automáticamente (opcional)
      env: {
        NODE_ENV: "development", // Configuración de entorno
      },
    },
  ],
};

