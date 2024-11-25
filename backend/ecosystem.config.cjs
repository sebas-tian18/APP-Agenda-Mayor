module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      watch: true,
      env: {
        NODE_ENV: "develop", // Producción
        DB_HOST: "45.236.130.139",
        DB_USER: "admin",
        DB_PASSWORD: "scamersqlos1",
        DB_DATABASE: "agenda_mayor",
        JWT_SECRET: "f7cf9dd7f5ccba95f45ab38920c4907b2b7f3c1bf041cbd1593da901dedcc22a",
      },
    },
  ],
};

