import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Servicios from "../pages/Servicios";
import EditarPerfil from "../pages/EditarPerfil";
import Ajustes from "../pages/Ajustes";
import Administrador from "../pages/Administrador";
import Home from "../pages/Home"; // Asegúrate de que esta importación sea correcta
import "./App.css";
import { FontSizeProvider } from "../Components/FontSizeContext";
import { Toaster } from "sonner";
import Navbar from "../Components/Navbar"; // Importa el Navbar
import Footer from "../Components/Footer";  // Importa el Footer

function App() {
  return (
    <FontSizeProvider>
      <div className="App">
        <Toaster richColors duration={3000} /> {/* Duración del toaster */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/" element={<Login />} />  {/* Esta será la vista predeterminada */}
            <Route path="/register" element={<Register />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="/home" element={<Home />} />  {/* Ruta para Home */}
          </Routes>
          <Footer />
        </Router>
      </div>
    </FontSizeProvider>
  );
}

export default App; 