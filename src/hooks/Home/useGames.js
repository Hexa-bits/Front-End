import { useState, useEffect } from 'react';
import { HOME_URL, HOME_URL_WS } from '../../utils/Constants.js';

function useGames(initialGames = []) {
    const [games, setGames] = useState(initialGames);
    const [error, setError] = useState(null);

    // Solicitud REST para obtener el estado inicial de las partidas
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(HOME_URL);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                setGames(data);
                setError(null); 
            } catch (error) {
                console.error("Error fetching lobbies:", error);
                setError(error.message); 
            }
        };

        fetchGames();
    }, []); 

    useEffect(() => {
        const ws = new WebSocket(HOME_URL_WS);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
            try {
                // Verifica si el mensaje es un JSON válido
                const gamesData = JSON.parse(event.data);

                // Verifica si los datos recibidos son diferentes a los actuales
                const isDifferent = JSON.stringify(games) !== JSON.stringify(gamesData);
                if (isDifferent) {
                    console.log('Actualizando juegos:', gamesData.length);
                    setGames(gamesData); 
                } else {
                    console.log('Datos recibidos son iguales a los actuales, no se actualiza el estado');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                setError('Error al procesar los datos del juego');
            }
        };

        ws.onclose = (event) => {
            console.log('Disconnected from WebSocket server', event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            setTimeout(() => {
                ws.close();
            }, 1000);
        };
    }, [games]);

    return { games, error };
}

export default useGames;