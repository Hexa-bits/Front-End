import './Home.css';
import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
import JoinGame from '../../../../utils/logics/Home/JoinGame.js';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { WS_HOME } from '../../../../utils/Constants.js';

function Home() {

    const gameId = localStorage.getItem('game_id');
    const playerId = parseInt(localStorage.getItem("id_user"),10);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const ws = useRef(null); // Mantener la referencia del WebSocket
    
    const [isWsOpen, setIsWsOpen] = useState(false); // Estado para manejar si el WebSocket está abierto

    const { games } = useGames(ws.current);

    const handleCrearPartida = () => {
        navigate("/home/create-config");
    };

    const { joinGame } = JoinGame(ws.current);
    const handleJoin = (gameId) => {
        joinGame(gameId, playerId);
    };

    useEffect(() => {
        if (!ws.current) {
            console.log("Inicializando WebSocket");
            ws.current = new WebSocket(WS_HOME);
            ws.current.onopen = () => {
                console.log("WebSocket está abierto");
                setIsWsOpen(true); // Actualizar el estado cuando el WebSocket está abierto
            };

            ws.current.onclose = () => {
                console.log("WebSocket está cerrado");
                setIsWsOpen(false); // Actualizar el estado cuando el WebSocket se cierra
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }

        return () => {
            if (isWsOpen) {
                console.log("Cerrando WebSocket en Home");
                ws.current.close(); // Cerrar solo si está abierto
            }
        };
    }, [isWsOpen]);


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
