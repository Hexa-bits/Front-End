
import React from "react";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import { useLocation } from "react-router-dom";
import { LeaveGame } from "../../../../hooks/Lobby/leaveGame.jsx";
import { StartGame } from "../../../../hooks/Lobby/startGame.jsx";

function Lobby() {
    const location = useLocation();
    const {isOwner, gameId} = location.state || {};
    const {players, gameName, maxPlayers} = useLobby(gameId);

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons isOwner={isOwner} onLeaveGame={LeaveGame()} onStartGame={StartGame()}/>
            </div>
        </div>
    );
}

export default Lobby;
