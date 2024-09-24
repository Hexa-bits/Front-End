import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // para manejar rutas
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import Lobby from './components/Lobby/Lobby.jsx';
import { LOGIN, HOME, LOBBY} from '../../utils/Constants.js';

function App () {

    return (    
        <Router>  
            <Routes>
                <Route path="/" element={<Navigate to={LOGIN}/>} />
                <Route path={LOGIN} element={<Login/>} />
                <Route path={HOME} element={<Home/>} />
                <Route path={LOBBY} element={<> <Home/> <Lobby /> </>} />
            </Routes>
        </Router>
        
    );
}

export default App ;
