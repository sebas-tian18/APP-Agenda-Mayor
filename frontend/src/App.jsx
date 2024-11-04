import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontSizeProvider } from "../components/FontSizeContext";
import { Toaster } from "sonner";
import "./App.css";
// Componentes 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Paginas Publicas
import Register from "../pages/Register";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
// Paginas Privadas
import Home from "../pages/Home";
import Servicios from "../pages/Servicios";
import EditarPerfil from "../pages/EditarPerfil";
import Ajustes from "../pages/Ajustes";
import Administrador from "../pages/Administrador";
import ViewCitas from "../pages/ViewCitas";
// Rutas privadas
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* Rutas privadas usuario*/}
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
                {/* Rutas privadas admin*/}
                {/* Rutas privadas profesional*/}
              </Routes>
              <Footer />
            </Router>
          </div>
        </FontSizeProvider>
    </AuthProvider>
  );
}

export default App;
