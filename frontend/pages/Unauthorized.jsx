import React from "react";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1>Acceso denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
    </div>
  );
}

export default Unauthorized;