import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Lobby.css";

import LobbyCard from "../../../../components/Lobby/Card/LobbyCard.jsx";
import LobbyList from "../../../../components/Lobby/List/LobbyList.jsx";
import LobbyButtons from "../../../../components/Lobby/Buttons/LobbyButtons.jsx";
import useLobby from "../../../../services/Lobby/useLobby.js";
import { LeaveGame } from "../../../../services/Lobby/leaveGame.jsx";
import { StartGame } from "../../../../services/Lobby/startGame.jsx";
import { HOME, GAME, WS_GAME } from "../../../../utils/Constants.js";
import {
  closeWsGameInstance,
  createWsGameInstance,
} from "../../../../services/WsGameService.js";

function Lobby() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOwner, gameId } = location.state || {};

  const ws = createWsGameInstance(WS_GAME + gameId);
  const { players, gameName, maxPlayers, activeGame, cancelGame } = useLobby(
    ws,
    gameId
  );

  useEffect(() => {
    if (activeGame) {
      navigate(GAME);
    }
    if (cancelGame) {
      closeWsGameInstance();
      navigate(HOME);
    }
  }, [cancelGame, activeGame]);

  const handleLeave = async () => {
    await LeaveGame(navigate);
  };

  return (
    <div className="lobby-overlay">
      <div className="lobby-container">
        <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />
        <LobbyList players={players} />
        <LobbyButtons
          isOwner={isOwner}
          onLeaveGame={handleLeave}
          onStartGame={StartGame(navigate)}
          oneJoined={players.length < 2}
        />
      </div>
    </div>
  );
}

export default Lobby;
