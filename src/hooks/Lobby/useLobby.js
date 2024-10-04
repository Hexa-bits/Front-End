import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOBBY_URL, WS_LOBBY_URL, HOME, GAME } from '../../utils/Constants.js';

export const useLobby = ((gameId) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [activeGame , setActiveGame] = useState(false); 
    const [cancelGame, setCancelGame] = useState(false);

    const navigate = useNavigate();

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

    useEffect(() => {
        const ws = new WebSocket(WS_LOBBY_URL + gameId);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

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

        ws.onclose = (event) => {
            console.log('Disconnected from WebSocket server', event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        }

    }, [players, gameName, maxPlayers, activeGame, cancelGame]);


    return {players, gameName, maxPlayers, activeGame};
});


