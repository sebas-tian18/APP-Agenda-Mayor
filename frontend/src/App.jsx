import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import "./App.css";
import { FontSizeProvider } from "../Components/FontSizeContext";
import { Toaster } from "sonner";

function App() {
  return (
    <FontSizeProvider>

    <div className="App">
      <Toaster richColors duration={3000} />  {/* Duracion del toaster */}
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
    </div>
    </FontSizeProvider>

  );
}

export default App;
