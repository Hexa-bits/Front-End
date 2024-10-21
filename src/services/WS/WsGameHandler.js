import { useEffect } from "react";
import { BOARD_CHANGED, FIGS_UPD, MOVS_UPD, TURN_ENDED, WINNER } from "../../utils/Constants";
// Esta función se encarga de manejar todos los mensajes que llegan por websocket
const wsGameHandler = (
  ws,
  fetchTurnData,
  getWinner,
  fetchFigs,
  fetchMovs,
  fetchBoxCards,
  setLabelMovParcial,
  fetchFormedFigs
) => {
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const message = event.data;
      
      switch (message) {
        case TURN_ENDED:
          setLabelMovParcial(false);
          fetchTurnData();
          fetchFigs();
          fetchMovs();
          fetchBoxCards();
          fetchFormedFigs();
          break;
        case WINNER:
          getWinner();
          break;
        case BOARD_CHANGED:
          fetchBoxCards();
          setLabelMovParcial(true);
          fetchFormedFigs();
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
  }, [ws, fetchTurnData, getWinner, fetchFigs, fetchMovs, fetchBoxCards, setLabelMovParcial, fetchFormedFigs]);
};

export default wsGameHandler;
