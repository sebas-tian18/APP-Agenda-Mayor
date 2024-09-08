import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Register from "../pages/Register"
import './App.css'



function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
