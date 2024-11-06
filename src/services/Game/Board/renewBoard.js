import { useState, useEffect, useCallback } from "react";
import { GAME_BOARD_URL } from "../../../utils/Constants.js";

function renewBoard(gameId) {
  const [boxCards, setBoxCards] = useState([]);
  const [movisParcial, setMovisParcial] = useState(false);
  const [forbiddenColor, setForbiddenColor] = useState(0);
  const fetchBoxCards = useCallback(async () => {
    try {
      const response = await fetch(GAME_BOARD_URL + gameId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las fichas del juego.");
      }
      const data = await response.json();
      console.log("Data -> ", data);
      console.log("Tablero:", data);
      setBoxCards(data.fichas); 
      setMovisParcial(data.parcial);
      setForbiddenColor(data.forbidden_color);
    } catch (error) {
      console.error("Error al obtener las fichas:", error);
    }
  }, [gameId]);

  useEffect(() => {
    fetchBoxCards();
  }, [fetchBoxCards]);

  return { boxCards, movisParcial, forbiddenColor, fetchBoxCards };
}
export default renewBoard;
