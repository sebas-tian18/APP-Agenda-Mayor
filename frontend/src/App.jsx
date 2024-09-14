import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"
import './App.css'



function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
