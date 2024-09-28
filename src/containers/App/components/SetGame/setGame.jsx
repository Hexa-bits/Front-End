import "./setGame.css";
import React from "react";
import Button from "../../../../components/Button/Button.jsx";
import ConfigGame from "../../../../components/ConfigGame/ConfigGame.jsx";
import { useSetGame } from "../../../../hooks/Setgame/useSetGame.js";
import { useNavigate } from "react-router-dom";

//Botón para entrar a una partida + interfaz partida
function Start() {
  const navigate = useNavigate();
  const {
    game_name,
    setGameName,
    max_players,
    setMaxPlayers,
    handleClick,
  } = useSetGame(navigate);

  return (
    <div className="setGame__container">
      <div className="setGame">
        <ConfigGame
          handleOnChange={(e) => setGameName(e.target.value)}
          maxPlayers={max_players}
          setPlayerAmnt={setMaxPlayers}
        />
        <Button
          label="Crear Partida"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}


export default Start;
