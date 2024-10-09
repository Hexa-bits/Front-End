import './Home.css';
import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
import JoinGame from '../../../../utils/logics/Home/JoinGame.js';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { WS_HOME } from '../../../../utils/Constants.js';

function Home() {

    const gameId = localStorage.getItem('game_id');
    const playerId = parseInt(localStorage.getItem("id_user"),10);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    // Crear conexión al WebSocket
    const ws = useRef(null);

    // Lista de Partidas
    const { games } = useGames(ws.current);

    const handleCrearPartida = () => {
        ws.current.close();
        navigate("/home/create-config");
    };
    
    const { joinGame } = JoinGame(ws.current);
    // Manejador de unirse a partida
    const handleJoin = (gameId) => {
        joinGame(gameId, playerId);
    };

    useEffect(() => {
        if(!ws.current){
            console.log("Inicializando WebSocket");
            ws.current = new WebSocket(WS_HOME);
        }
        
        // Limpiar la conexión del WebSocket al desmontar el componente
        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <div className="Home">
            <section className="NombreUsuario">
                <div className="dataUser">
                <div className="user">Usuario: {username}</div>
                <div className="id_user"> Id_Usuario: {playerId}</div>
            </div>
            </section>

            <section className="CrearPartida">
            <Button 
                label="Crear Partida" 
                onClick={handleCrearPartida} 
            />
            </section>
            
            <section className="GameList__Home">
                <GameList 
                games={games} 
                handleJoin={handleJoin} 
                />
            </section>
        </div>
    );
}

export default Home;
