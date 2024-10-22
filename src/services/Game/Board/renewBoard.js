import { useState, useEffect, useCallback } from "react";
import { GAME_BOARD_URL } from "../../../utils/Constants.js";

function renewBoard(gameId) {
  const [boxCards, setBoxCards] = useState([]);
  const  [movisParcial, setMovisParcial] = useState(false);
  const fetchBoxCards = useCallback(async () => {
    try {
      const response = await fetch(GAME_BOARD_URL + gameId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las fichas del juego.");
      }
      const data = await response.json();
      console.log("Tablero:", data);
      setBoxCards(data.fichas); 
      setMovisParcial(data.parcial);
      // console.log("Mov. Parcial -> ", data.parcial);
    } catch (error) {
      console.error("Error al obtener las fichas:", error);
    }
  }, [gameId]);

  useEffect(() => {
    fetchBoxCards();
  }, [fetchBoxCards]);

  return { boxCards, movisParcial, fetchBoxCards };
}
export default renewBoard;
