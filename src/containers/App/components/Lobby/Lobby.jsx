
import React, { useEffect, useState } from "react";
import './Lobby.css';

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx"
import { useLocation } from 'react-router-dom';
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import { useGameIdUrl } from "../../../../hooks/Lobby/useGameId.js";
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";

function Lobby({ isOwner }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get("game_id");
    const fullUrl = useGameIdUrl(gameId);

    const {players, gameName, maxPlayers} = useLobby(fullUrl);

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons isOwner={isOwner} />
            </div>
        </div>
    );
}

export default Lobby;
