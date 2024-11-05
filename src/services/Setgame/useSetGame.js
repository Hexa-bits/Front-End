import { useState } from "react";
import { create } from "./useCreate.js";
import { checkInput, checkButtons, checkPassword} from "../../utils/logics/setGame/LogicSetGame.js";
import bcrypt from "bcryptjs";

export const useSetGame = (navigate) => {
    const [game_name, setGameName] = useState("");
    const [game_password, setGamePassword] = useState("");
    const [max_players, setMaxPlayers] = useState(0);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleClick = async () => {
      const isNameValid = checkInput(game_name);
      const isPassValid = !isPrivate || checkPassword(game_password);
      const isPlayerValid = checkButtons(max_players);
      const encryptedPass = await bcrypt.hash(game_password, 10);

      if (isNameValid && isPassValid && isPlayerValid) {
        // Llamada a la función de creación del juego con los valores adecuados
        create(game_name, isPrivate ? encryptedPass : "", max_players, navigate);
      } else {
        // Validación de errores
        if (!isNameValid) {
          alert("Error: el nombre debe tener entre 1 y 10 caracteres.");
        } 
        else if (!isPassValid) {
          alert("Error: la contraseña debe tener entre 1 y 15 caracteres.");
        } 
        else if (!isPlayerValid) {
          alert("Error: la cantidad de jugadores es inválida.");
        }
      }
    };
  
    return {
      setGameName,
      setGamePassword,
      max_players,
      setMaxPlayers,
      isPrivate,
      setIsPrivate,
      handleClick,
    };
  };