import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Servicios from "../pages/Servicios";
import "./App.css";
import { FontSizeProvider } from "../Components/FontSizeContext";
import { Toaster } from "sonner";
import Navbar from "../Components/Navbar"; // Importa el Navbar
import Footer from "../Components/Footer";  // Importa el Footer

function App() {
  return (

    
    <FontSizeProvider>

    <div className="App">
      <Toaster richColors duration={3000} />  {/* Duracion del toaster */}
        <Router>
        <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/servicios" element={<Servicios />} />
          </Routes>
          <Footer /> 
        </Router>
    </div>
    </FontSizeProvider>

  );
}

export default App;
