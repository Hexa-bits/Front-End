/* eslint-disable no-unused-vars */
import "./setGame.css";
import React from "react";
import Button from "../../../../components/Button/Button.jsx";
import ConfigGame from "../../../../components/ConfigGame/ConfigGame.jsx";
import { useSetGame } from "../../../../services/Setgame/useSetGame.js";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../../utils/Constants.js";

//Botón para entrar a una partida + interfaz partida
function Start() {
  const navigate = useNavigate();
  const { 
    setGameName,
    setGamePassword, 
    max_players, 
    setMaxPlayers, 
    isPrivate,
    setIsPrivate,
    handleClick 
  } = useSetGame(navigate);

  return (
    <div className="setGame__container">
      <Button 
        onClick={() => navigate(HOME)} 
        className="back-btn" 
      />
      <div className="setGame">
        <ConfigGame
          handleName={(e) => setGameName(e.target.value)}
          handlePassword={(e) => setGamePassword(e.target.value)}
          maxPlayers={max_players}
          setPlayerAmnt={setMaxPlayers}
          isPrivate={isPrivate}
          setPrivate={setIsPrivate}
        />
        <Button label="CREAR PARTIDA" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Start;
