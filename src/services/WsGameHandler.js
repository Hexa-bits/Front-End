import { useEffect } from "react";
// Esta función se encarga de manejar todos los mensajes que llegan por websocket
const wsGameHandler = (
  ws,
  fetchTurnData,
  getWinner,
  fetchFigs,
  fetchMovs,
  fetchBoxCards
) => {
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const message = event.data;

      if (message === "Terminó turno") {
        console.log("Mensaje de turno recibido");
        fetchTurnData();
        fetchFigs();
        fetchMovs();
        fetchBoxCards();
      } else if (message === "Hay Ganador") {
        console.log("Mensaje de ganador recibido");
        getWinner();
      } else if (message === "Hay modificación de Tablero") {
        fetchBoxCards();
      }
    };
  }, [ws, fetchTurnData, getWinner, fetchFigs, fetchMovs, fetchBoxCards]);
};

export default wsGameHandler;
