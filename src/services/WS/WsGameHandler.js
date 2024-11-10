import { useEffect } from "react";
import {
  BOARD_CHANGED,
  FIGS_UPD,
  MOVS_UPD,
  TURN_ENDED,
  WINNER,
  OTHERS_UPD,
} from "../../utils/Constants";
import CountdownTimer from "../../components/Game/Timer/timer";
// Esta función se encarga de manejar todos los mensajes que llegan por websocket
const wsGameHandler = (
  ws,
  fetchTurnData,
  getWinner,
  fetchFigs,
  fetchMovs,
  fetchBoxCards,
  fetchInfoPlayers,
  fetchFormedFigs,
  setResetTimer
) => {
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const message = event.data;

      switch (message) {
        case TURN_ENDED:
          fetchTurnData();
          fetchFigs();
          fetchMovs();
          fetchBoxCards();
          fetchFormedFigs();
          fetchInfoPlayers();
          setResetTimer(true);
          break;
        case WINNER:
          getWinner();
          break;
        case BOARD_CHANGED:
          fetchBoxCards();
          fetchFormedFigs();
          break;
        case FIGS_UPD:
          fetchFigs();
          fetchInfoPlayers();
          break;
        case MOVS_UPD:
          fetchMovs();
          fetchInfoPlayers();
          break;
        case OTHERS_UPD:
          fetchInfoPlayers();
          break;
        default:
          break;
      }
    };
  }, [
    ws,
    fetchTurnData,
    getWinner,
    fetchFigs,
    fetchMovs,
    fetchBoxCards,
    fetchInfoPlayers,
    fetchFormedFigs,
    setResetTimer,
  ]);
};

export default wsGameHandler;
