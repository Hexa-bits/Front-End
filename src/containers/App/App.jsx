import './App.css';
import Login from './components/Login/Login.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // para manejar rutas
import Home from './components/Home/Home.jsx';
import Lobby from './components/Lobby/Lobby.jsx';

function App () {

    return (    
        <Router>  
            <Routes>
                <Route path="/" element={<Navigate to="/loggin"/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/home/lobby" element={<> <Home/> <Lobby isOwner={true}/> </>} />
            </Routes>
        </Router>
        
    );
}

export default App ;