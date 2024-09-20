import "./App.css";
import Login from "./components/Login/Login.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // para manejar rutas
import Home from "./components/Home/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    // aca deberia ir uno que me lleve a gamecconfig?
  );
}

export default App;
