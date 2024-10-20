import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Servicios from "../pages/Servicios";
import EditarPerfil from "../pages/EditarPerfil";
import Ajustes from "../pages/Ajustes";
import Administrador from "../pages/Administrador";
import ViewCitas from "../pages/ViewCitas";
import Home from "../pages/Home";
import "./App.css";
import { FontSizeProvider } from "../components/FontSizeContext";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from "../components/PrivateRoute"; // Importa la ruta privada

function App() {
  return (
    <FontSizeProvider>
      <div className="App">
        <Toaster richColors duration={3000} />
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Rutas privadas */}
            <Route path="/citas" 
            element={
              <PrivateRoute>
                <ViewCitas />
              </PrivateRoute>  
              } 
            />
            <Route
              path="/administrador"
              element={
                <PrivateRoute>
                  <Administrador />
                </PrivateRoute>
              }
            />
            <Route
              path="/servicios"
              element={
                <PrivateRoute>
                  <Servicios />
                </PrivateRoute>
              }
            />
            <Route
              path="/editar-perfil"
              element={
                <PrivateRoute>
                  <EditarPerfil />
                </PrivateRoute>
              }
            />
            <Route
              path="/ajustes"
              element={
                <PrivateRoute>
                  <Ajustes />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendario"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/administrar"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </FontSizeProvider>
  );
}

export default App;
