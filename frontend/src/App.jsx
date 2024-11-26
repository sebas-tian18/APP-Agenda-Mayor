import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontSizeProvider } from "./components/FontSizeContext";
import { Toaster } from "sonner";
import "./App.css";
// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Paginas Publicas
import Register from "./pages/Register";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
// Paginas Privadas
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import EditarPerfil from "./pages/EditarPerfil";
import Ajustes from "./pages/Ajustes";
import AjustesAdmin from "./pages/AjustesAdmin";
import Administrador from "./pages/Administrador";
import ViewCitas from "./pages/ViewCitas";
import ViewCalendar from "./pages/ViewCalendar";
import ProCrearCita from "./pages/ProCrearCita";
import UserTypeSelection from "./components/UserTypeSelection";
import AdminForm from "./components/AdminForm";
import ProfessionalForm from "./components/ProfessionalForm";
import UserList from "./components/UserList";
import ViewCalendarUser from "./pages/ViewCalendarUser";
// Rutas
import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <FontSizeProvider>
        <div className="App min-h-screen flex flex-col">
          <Toaster richColors duration={3000} />
          <Router>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Rutas públicas (redirecciona si esta autenticado)*/}
                <Route
                  path="/"
                  element={
                    <RedirectRoute>
                      <Login />
                    </RedirectRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RedirectRoute>
                      <Login />
                    </RedirectRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <RedirectRoute>
                      <Register />
                    </RedirectRoute>
                  }
                />
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* Rutas privadas usuario adulto mayor*/}
                <Route
                  path="/ViewCalendar"
                  element={
                    <PrivateRoute>
                      <ViewCalendar />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/citas"
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
                      <ViewCalendarUser />
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
                <Route
                  path="/ajustes-admin"
                  element={
                    <PrivateRoute>
                      <AjustesAdmin />
                    </PrivateRoute>
                  }
                />
                {/* Rutas privadas admin*/}
                <Route
                  path="/crear-usuario"
                  element={
                    <PrivateRoute>
                      <UserTypeSelection />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/crear-admin"
                  element={
                    <PrivateRoute>
                      <AdminForm />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/crear-profesional"
                  element={
                    <PrivateRoute>
                      <ProfessionalForm />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/ver-usuarios"
                  element={
                    <PrivateRoute>
                      <UserList />
                    </PrivateRoute>
                  }
                ></Route>

                {/* Rutas privadas profesional*/}
                <Route
                  path="/crear-cita"
                  element={
                    <PrivateRoute>
                      <ProCrearCita />
                    </PrivateRoute>
                  }
                ></Route>
              </Routes>
            </main>
            <Footer />
          </Router>
        </div>
      </FontSizeProvider>
    </AuthProvider>
  );
}

export default App;
