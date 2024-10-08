import React, { useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import { LeaveGame } from "../../../../hooks/Lobby/leaveGame.jsx";
import { StartGame } from "../../../../hooks/Lobby/startGame.jsx";
import { HOME, GAME, WS_GAME} from "../../../../utils/Constants.js";

function Lobby() {
    const location = useLocation();
    const navigate = useNavigate();
    const {isOwner, gameId} = location.state || {};
    
    const ws = new WebSocket(WS_GAME + gameId);
    
    const {players, gameName, maxPlayers, activeGame, cancelGame} = useLobby(ws, gameId);

    useEffect(() => {
        if (activeGame) { navigate(GAME); }
        if (cancelGame) { navigate(HOME); ws && ws.close(); }
    }, [cancelGame, activeGame]);

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons 
                    isOwner={isOwner} 
                    onLeaveGame={LeaveGame(ws, navigate)} 
                    onStartGame={StartGame(navigate)}
                />
            </div>
        </div>
    );
}

export default Lobby;
