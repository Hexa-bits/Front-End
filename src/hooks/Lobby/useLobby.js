import { useState, useEffect } from 'react';
import { LOBBY_URL, WS_LOBBY_URL, HOME, GAME } from '../../utils/Constants.js';

export const useLobby = ((gameId, navigate) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [activeGame , setActiveGame] = useState(false); 
    const [cancelGame, setCancelGame] = useState(false);
    const [isWsConnected, setIsWsConnected] = useState(false);


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
        if (!isWsConnected) return;

        const ws = new WebSocket(WS_LOBBY_URL + gameId);
        ws.onmessage = (event) => {
            const message = event.data;
            if (message){console.log('Actualización de Lobby.')}
            if (message.startsWith('{') || message.startsWith('[')) {
                try {
                    const lobbyData = JSON.parse(message);
                    setPlayers(lobbyData.name_players || []);
                    setActiveGame(lobbyData.start_owner);
                    setCancelGame(lobbyData.cancel_owner);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
            if (cancelGame){ navigate(HOME); }
            if (activeGame){ navigate(GAME); }
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        return () => { ws.close(); }

    }, [isWsConnected]);


    return {players, gameName, maxPlayers, activeGame, cancelGame};
});


