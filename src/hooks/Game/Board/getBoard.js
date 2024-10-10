import { useState, useEffect } from "react";
import { GAME_BOARD_URL } from "../../../utils/Constants.js";

function renewBoard(ws, gameId) {
  const [boxCards, setBoxCards] = useState([]);
  const fetchBCards = async () => {
    const gameId = parseInt(localStorage.getItem("game_id"));
    try {
      const response = await fetch(GAME_BOARD_URL + gameId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las fichas del juego.");
      }
      const data = await response.json(); //fichas: [ { x: int, y: int, color: int} ]
      //const colors = data.fichas.map((ficha) => ficha.color);
      setBoxCards(data.fichas.color);
      console.log("Colores: ", colors); //pedir ayuda en esto
    } catch (error) {
      console.error("Error al obtener las fichas:", error);
    }
  };

  useEffect(() => {
    fetchBCards();
  }, [gameIdId]);

  useEffect(() => {
    if (!ws) return; //si el ws no está abierto no hace nada
    ws.onmessage = (event) => {
      const message = event.data; //acá el mje va a ser sacado de lo q me manda el evento
      if (
        message === "Inició la partida" ||
        message === "Hay modificación de Tablero"
      ) {
        fetchBCards();
      }
    };
    ws.onerror = (error) => {
      console.error("ws error:", error);
    };
  }, [ws]);
  return { boxCards };
}
export default renewBoard;
