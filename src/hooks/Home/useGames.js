import { useState, useEffect } from 'react';
import { HOME_URL } from '../../utils/Constants.js';

function useGames(ws) {
    const [games, setGames] = useState([]);
    
    const getListGames = async () => {
        try {
            const response = await fetch(HOME_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            console.log("Se pidió por GET: ", data);
            setGames(data);
        } catch (error) {
            console.error("Error fetching lobbies:", error);
        }
    }

    // useEffect para manejar WebSocket y actualizaciones
    useEffect(() => {
        if (!ws) return; // Verificamos que el WebSocket esté definido

        // Llamar a getListGames al montar el componente para obtener las partidas iniciales
        getListGames();

        // Establecer los manejadores de eventos del WebSocket
        ws.onmessage = (event) => {
            const message = event.data;
            console.log("Mensaje recibido:", message);
            if (message && message === "Actualizar lista de partidas") {
                getListGames(); // Refrescar la lista si se recibe la notificación de actualización
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Limpiar cuando se desmonte el componente
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close(); // Cerrar el WebSocket si sigue abierto
            }
        };
    }, [ws]); // Solo se ejecuta cuando `ws` cambia

    return { games };
}

export default useGames;
