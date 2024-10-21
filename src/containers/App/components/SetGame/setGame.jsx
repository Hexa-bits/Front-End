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
  const { game_name, setGameName, max_players, setMaxPlayers, handleClick } =
    useSetGame(navigate);

  return (
    <div className="setGame__container">
      {/* <Button 
        onClick={() => navigate(HOME)} 
        className="back-btn" 
      /> */}
      <div className="setGame">
        <ConfigGame
          handleOnChange={(e) => setGameName(e.target.value)}
          maxPlayers={max_players}
          setPlayerAmnt={setMaxPlayers}
        />
        <Button label="CREAR PARTIDA" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Start;
