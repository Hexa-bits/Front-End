import { useState, useEffect } from 'react';
import { HOME_URL, HOME_URL_WS } from '../../utils/Constants.js';

function useGames() {
    const [games, setGames] = useState([]);
    const [isWsConnected, setIsWsConnected] = useState(false);

    // Solicitud REST para obtener el estado inicial de las partidas
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(HOME_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                );
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                setGames(data);
                setIsWsConnected(true); // Indica que ya se han obtenido los juegos y se puede establecer la conexión WebSocket
            } catch (error) {
                console.error("Error fetching lobbies:", error);
            }
        };
        fetchGames();
    }, []);

    // Conectar al WebSocket después de obtener los datos iniciales
    useEffect(() => {
        if (!isWsConnected) return;

        const ws = new WebSocket(HOME_URL_WS);

        ws.onmessage = (event) => {
            const message = event.data;
            if (message){console.log('Actualización de Partidas.')}
            
            if (message.startsWith('{') || message.startsWith('[')) {
                try {
                    const gamesData = JSON.parse(message);
                    setGames(gamesData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, [isWsConnected]);

    return { games };
}

export default useGames;
