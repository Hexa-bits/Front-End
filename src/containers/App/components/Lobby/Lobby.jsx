
import React from "react";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import { useGameIdUrl } from "../../../../hooks/Lobby/useGameId.js";
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { leaveGame } from "../../../../hooks/Lobby/useLeaveGame.js";
// import { startGame } from "../../../../hooks/Lobby/useStartGame.js";

function Lobby() {
    const location = useLocation();
    const {isOwner, gameId} = location.state || {};

    const fullUrl = useGameIdUrl(gameId);
    const {players, gameName, maxPlayers} = useLobby(fullUrl);

    const navigate = useNavigate();
    const handleLeaveGame = () => {leaveGame(gameId, navigate);};
    // const handleStartGame = () => {startGame(gameId, navigate);};

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons isOwner={isOwner} onLeaveGame={handleLeaveGame} />
            </div>
        </div>
    );
}

export default Lobby;
