import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import useLobby from "../../../../hooks/Lobby/useLobby.js";
import {LeaveGame} from "../../../../hooks/Lobby/leaveGame.jsx";
import { StartGame } from "../../../../hooks/Lobby/startGame.jsx";
import { HOME, GAME, WS_GAME} from "../../../../utils/Constants.js";

function Lobby() {
    const location = useLocation();
    const navigate = useNavigate();
    const {isOwner, gameId} = location.state || {};
    const [isWsOpen, setIsWsOpen] = useState(false);

    const ws = useRef(null);
    
    const {players, gameName, maxPlayers, activeGame, cancelGame} = useLobby(ws.current, gameId);

    useEffect(() => {
        if (activeGame) { navigate(GAME); }
        if (cancelGame) {  ws.current && ws.current.close(); navigate(HOME); }
    }, [cancelGame, activeGame]);

    useEffect(() => {
        if(!ws.current){
            console.log("Inicializando WebSocket");
            ws.current = new WebSocket(WS_GAME + gameId);

            ws.current.onopen = () => {
                console.log("WebSocket abierto en Lobby");
                setIsWsOpen(true);
            }

            ws.current.onclose = () => {
                console.log("WebSocket cerrado en Lobby");
                setIsWsOpen(false);
            }
        }

        return () => {
            if (isWsOpen) {
                console.log("Cerrando WebSocket en Lobby");
                ws.current.close();
            }
        }
    }, [isWsOpen]);

    const handleLeave = async () => {
        if (ws.current) {
            ws.current.close();
        }
        await LeaveGame(navigate);
    };

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons 
                    isOwner={isOwner} 
                    onLeaveGame={handleLeave} 
                    onStartGame={StartGame(navigate)}
                />
            </div>
        </div>
    );
}

export default Lobby;
