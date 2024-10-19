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
      // if(message==="Se unió jugador en lobby" || message === "Abandonó jugador en lobby"){
      // }
      if (message === "Inició la partida") {
        console.log("Mensaje de partida iniciada");
        fetchFigs(); //cartas fig y mov
        fetchMovs();
        fetchTurnData(); //info del turno
        fetchBoxCards(); //ver tablero
      } else if (message === "Terminó turno") {
        console.log("Mensaje de turno recibido");
        fetchFigs(); //cartas fig y mov
        fetchMovs();
        fetchTurnData(); //info del turno
        //fetchBoxCards();
      } else if (message === "Hay modificación de Tablero") {
        console.log("Mensaje recibido modificación tablero");
        fetchBoxCards(); //ver tablero
      } else if (message === "Hay Ganador") {
        console.log("Mensaje de ganador recibido");
        getWinner();
      } else if (message === "Actualizar cartas de movimiento") {
        fetchMovs(); //cartas fig y mov
      } else if (message === "Actualizar cartas de figura") {
        fetchFigs(); //cartas fig y mov
      }
    };
  }, [ws, fetchTurnData, getWinner, fetchFigs, fetchMovs, fetchBoxCards]);
};

export default wsGameHandler;
