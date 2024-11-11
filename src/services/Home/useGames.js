import { useState, useEffect } from "react";
import { HOME_URL } from "../../utils/Constants.js";

function useGames(ws, playerName) {
  const [games, setGames] = useState([]);

  const getListGames = async () => {
    try {
      const response = await fetch(HOME_URL + playerName, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      console.log("Se pidió por GET: ", data);
      setGames(data);

    } catch (error) {
      console.error("Error fetching lobbies:", error);
    }
  };

  useEffect(() => {
    if (!ws) return; // Verificamos que el WebSocket esté definido

    console.log("Primer llamado a getListGames");
    getListGames(); 

    // Establecer los manejadores de eventos del WebSocket
    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Mensaje recibido:", message);
      if (message && message === "Actualizar lista de partidas") {
        console.log("Llamado de mensajes de actualización.");
        getListGames(); 
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Limpiar cuando se desmonte el componente
    return () => {
      console.log("Limpiando WebSocket");
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [ws]);

  return { games };
}

export default useGames;
