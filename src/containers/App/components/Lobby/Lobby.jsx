import React from "react";
import './Lobby.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { useGameIdUrl } from "../../../../hooks/Lobby/useGameIdUrl.js";
import { useLobby } from "../../../../hooks/Lobby/useLobby.js";
import LobbyCard from "../../../../components/Lobby_Card/LobbyCard.jsx";
import LobbyList from "../../../../components/Lobby_List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby_Buttons/LobbyButtons.jsx";
import { leaveGame } from "../../../../hooks/Lobby/useGameService.js";

function Lobby({ isOwner = true}) {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get("game_id");
    const fullUrl = useGameIdUrl(gameId);  

    const navigate = useNavigate();
    const { players, gameName, maxPlayers } = useLobby(fullUrl);  

    return (
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
                <LobbyList players={players} />
                <LobbyButtons isOwner={isOwner} leaveGame={() => leaveGame(gameId, navigate)} />
            </div>
        </div>
    );
}

export default Lobby;
