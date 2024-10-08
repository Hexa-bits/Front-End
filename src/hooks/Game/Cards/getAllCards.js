import { useState, useEffect } from "react";
import getFigureCards from "./getFigureCards";
import getMovements from "./getMovements";
import { GET_MOVEMENTS_URL_WS } from "../../../utils/Constants";
import { GET_FIGURES_URL_WS } from "../../../utils/Constants";

function getAllCards() {
  const [figs_ids, setFigId] = useState([]);
  const [movs_ids, setMovsIds] = useState([]);
  const [isWsConnected, setIsWsConnected] = useState(null);
  const playerId = localStorage.getItem("id_user");
  const fullUrlF = useFigCardWs(playerId);
  const fullUrlM = useMovCardWs(playerId);

  console.log("playerId:", playerId);

  //comunicacióń con el ws
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { movs_ids } = await getMovements(playerId);
        setMovsIds(movs_ids);
        const { figs_ids } = await getFigureCards(playerId);
        setFigId(figs_ids);

        // console.log("htpp figs_ids:", figs_ids);
        // console.log("http movs_ids:", movs_ids);

        setIsWsConnected(false); // Indica que ya se han obtenido las cartas y se puede establecer la conexión WebSocket
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchCards();
  }, []);

  // Conectar al WebSocket después de obtener los datos iniciales
  useEffect(() => {
    if (!isWsConnected) {
      return;
    }

    console.log("Connecting to WebSocket:");
    const websocketfig = new WebSocket(GET_FIGURES_URL_WS + playerId);
    const websocketmov = new WebSocket(GET_MOVEMENTS_URL_WS + playerId);

    websocketfig.onmessage = (event) => {
      const message = event.data;
      if (message && message.startsWith("{")) {
        try {
          const data = JSON.parse(message);
          setFigId(data.id_fig_card);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      }
    };

    websocketmov.onmessage = (event) => {
      const message = event.data;
      if (message && message.startsWith("{")) {
        try {
          const data = JSON.parse(message);
          setMovsIds(data.id_mov_card);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      }
    };

    return () => {
      websocketfig.close();
      websocketmov.close();
    };
  }, [isWsConnected]);

  console.log("figs_ids:", figs_ids);
  console.log("movs_ids:", movs_ids);
  return { movs_ids, figs_ids };
}

export default getAllCards;
