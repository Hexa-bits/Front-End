// Home.js
import useWebSocket from "../../../../hooks/WebSocket/useWebSocket.js";

import './Home.css';
import React from 'react';
// import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
// import { useHomeLogic } from '../../../../utils/logics/Home/LogicJoinGame.js';
import { useNavigate } from "react-router-dom";
import { LOBBY } from '../../../../utils/Constants.js';


function Home() {
    const navigate = useNavigate();
    const { socket, data: games = [] } = useWebSocket('ws://localhost:8000/ws'); 
    console.log('Games:', games);
    const user = localStorage.getItem("username");
    const user_id = localStorage.getItem("id_user");

    const handleCrearPartida = () => {
        navigate("/home/create-config");
    };

    const handleJoinGame = (gameId) => {
        console.log("Navegando al lobby con gameId:", gameId);
        navigate(LOBBY, { state: { isOwner: false, gameId } });
    };

    const handleJoin = async (gameId) => {
        try {
            await joinGame(gameId, parseInt(user_id, 10));
            handleJoinGame(gameId);
        } catch (error) {
            console.error("Error al unirse a la partida:", error);
        }
    };

    return (
        <div className="Home">
            <section className="NombreUsuario">
                <div className="dataUser">
                    <div className="user">Usuario: {user}</div>
                    <div className="id_user">Id_Usuario: {user_id}</div>
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


