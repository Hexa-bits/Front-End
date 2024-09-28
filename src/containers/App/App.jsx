import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // para manejar rutas
import Login from './components/Login/Login.jsx';
import Start from "./components/SetGame/setGame.jsx";
import Home from './components/Home/Home.jsx';
import "./App.css";

function App () {
    return (    
        <Router>  
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/home/create-config" element={<Start/>}/>
            </Routes>
        </Router>
    );
}

export default App ;

