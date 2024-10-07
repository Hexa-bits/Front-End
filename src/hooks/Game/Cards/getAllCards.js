import { useState, useEffect } from "react";
import getFigureCards from "./getFigureCards";
import { useFigCardWs } from "./useFigCardUrl";

function getAllCards() {
  const [figId, setFigId] = useState(null);
  const [isWsConnected, setIsWsConnected] = useState(null);
  const playerId = localStorage.getItem("id_player");
  const fullUrl = useFigCardWs(playerId);

  //comunicacióń con el ws
  useEffect(() => {
    const fetchFigs = async () => {
      try {
        const { figId: newFigId } = await getFigureCards();
        setFigId(newFigId);
        setIsWsConnected(true); // Indica que ya se han obtenido las cartas y se puede establecer la conexión WebSocket
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchFigs();
  }, []);

  // Conectar al WebSocket después de obtener los datos iniciales
  useEffect(() => {
    if (!isWsConnected) {
      return;
    }

    console.log("Connecting to WebSocket:");
    const websocket = new WebSocket(fullUrl);

    websocket.onmessage = (event) => {
      const message = event.data;
      if (message && message.startsWith("{")) {
        try {
          const data = JSON.parse(message);
          setFigId(data.figId);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      }
    };

    return () => {
      websocket.close();
    };
  }, [isConnectWS]);

  return { figId };
}

export default getAllCards;
