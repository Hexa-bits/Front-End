import { useState, useEffect } from 'react';
import { LOBBY_URL, WS_LOBBY_URL, HOME, GAME } from '../../utils/Constants.js';

export const useLobby = ((gameId, navigate) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [activeGame , setActiveGame] = useState(false); 
    const [cancelGame, setCancelGame] = useState(false);


    // Seteo info del lobby al montar el componente
    useEffect(() => {
        const getGameInfo = async () => {
            try {
                const response = await fetch( LOBBY_URL + gameId, {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Error al obtener información del juego.");
                }
                const data = await response.json();
                console.log("Obteniendo información del juego...");
    
                setPlayers(data.name_players || []);
                setGameName(data.game_name);
                setMaxPlayers(data.max_players);
                setActiveGame(data.start_owner);
                setCancelGame(data.cancel_owner);
            } catch (error) {
                console.log("Error al obtener información del juego. " + error.message);
            }
        }
        getGameInfo();
    }, []);

    // Mantener actualizado el lobby con WebSocket
    useEffect(() => {
        const ws = new WebSocket(WS_LOBBY_URL + gameId);
        ws.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
            try {
                // Verifica si el mensaje es un JSON válido
                const new_data = JSON.parse(event.data);
                setActiveGame(new_data.start_owner);
                setCancelGame(new_data.cancel_owner);
                setPlayers(new_data.name_players || []);
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
                setError('Error al procesar los datos del juego');
            }
            if (cancelGame){ navigate(HOME); }
            if (activeGame){ navigate(GAME); }
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        return () => { ws.close(); }

    }, [players, activeGame, cancelGame]);


    return {players, gameName, maxPlayers, activeGame, cancelGame};
});


