import { useEffect } from "react";
import { BOARD_CHANGED, FIGS_UPD, MOVS_UPD, TURN_ENDED, WINNER } from "../../utils/Constants";
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

      switch (message) {
        case TURN_ENDED:
          console.log("Mensaje de turno recibido");
          fetchTurnData();
          fetchFigs();
          fetchMovs();
          fetchBoxCards();
          break;
        case WINNER:
          console.log("Mensaje de ganador recibido");
          getWinner();
          break;
        case BOARD_CHANGED:
          fetchBoxCards();
          break;
        case FIGS_UPD:
          fetchFigs();
          break;
        case MOVS_UPD:
          fetchMovs();
          break;
        default:
          break;
      }
    };
  }, [ws, fetchTurnData, getWinner, fetchFigs, fetchMovs, fetchBoxCards]);
};

export default wsGameHandler;
