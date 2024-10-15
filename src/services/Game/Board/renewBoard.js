import { useState, useEffect, useCallback } from "react";
import { GAME_BOARD_URL } from "../../../utils/Constants.js";

function renewBoard(gameId) {
  const [boxCards, setBoxCards] = useState([]);
  const fetchBoxCards = useCallback(async () => {
    const gameId = parseInt(localStorage.getItem("game_id"));
    try {
      const response = await fetch(GAME_BOARD_URL + gameId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las fichas del juego.");
      }
      const data = await response.json(); //fichas: [ { x: int, y: int, color: int}
      setBoxCards(data.fichas); //o seria data fichas[index].color y ahi obtengo del color 1 al 36?
    } catch (error) {
      console.error("Error al obtener las fichas:", error);
    }
  }, [gameId]);

  useEffect(() => {
    fetchBoxCards();
  }, [fetchBoxCards]);

  return { boxCards, fetchBoxCards };
}
export default renewBoard;
