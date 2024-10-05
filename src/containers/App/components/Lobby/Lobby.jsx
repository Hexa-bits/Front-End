import React from "react";
import { useLocation } from "react-router-dom";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import { LeaveGame } from "../../../../hooks/Lobby/leaveGame.jsx";
import { StartGame } from "../../../../hooks/Lobby/startGame.jsx";
import { useNavigate } from 'react-router-dom';

function Lobby() {
    const location = useLocation();
    const navigate = useNavigate();
    const {isOwner, gameId} = location.state || {};
    const {players, gameName, maxPlayers} = useLobby(gameId, navigate);

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons isOwner={isOwner} onLeaveGame={LeaveGame(navigate)} onStartGame={StartGame(navigate)}/>
            </div>
        </div>
    );
}

export default Lobby;
