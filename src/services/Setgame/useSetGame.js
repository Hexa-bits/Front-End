import { useState } from "react";
import { create } from "./useCreate.js";
import { checkInput, checkButtons } from "../../utils/logics/setGame/LogicSetGame.js";

export const useSetGame = (navigate) => {
    const [game_name, setGameName] = useState("");
    const [game_password, setGamePassword] = useState("");
    const [max_players, setMaxPlayers] = useState(0);
  
    const handleClick = async () => {
      if (checkInput(game_name) && checkButtons(max_players)) {
        // Llamada a la función de creación del juego con los valores adecuados
        create(game_name, game_password, max_players, navigate);
      } else {
        // Validación de errores
        if (!checkInput(game_name)) {
          alert("Error: el nombre debe tener entre 1 y 10 caracteres.");
        } else if (!checkButtons(max_players)) {
          alert("Error: la cantidad de jugadores es inválida.");
        }
      }
    };
  
    return {
      setGameName,
      setGamePassword,
      max_players,
      setMaxPlayers,
      handleClick,
    };
  };