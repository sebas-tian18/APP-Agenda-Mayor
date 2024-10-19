import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const token = sessionStorage.getItem('token');
  const user = jwtDecode(token);
  const username = user.nombre_usuario;
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Bienvenido(a){username ? `, ${username}` : 'Iniciar sesión denuevo'} a la página principal
      </h1>
    </div>
  );
};

export default Home;