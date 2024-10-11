import { useState, useEffect } from 'react';
import { LOBBY_URL } from '../../utils/Constants.js';

function useLobby (ws, gameId) {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [activeGame, setActiveGame] = useState(false);
    const [cancelGame, setCancelGame] = useState(false);

    
    const getLobbyInfo = async () => {
        try {
            const response = await fetch(LOBBY_URL + gameId, { 
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error("Response not ok");
            }
            const data = await response.json();
            console.log("http: Obteniendo información del juego...");
            setPlayers(data.name_players || []);
            setGameName(data.game_name);
            setMaxPlayers(data.max_players);
            
        } catch (error) {
            console.log("http: Error al obtener información del juego. " + error.message);
        }
    }

    useEffect(() => { 
        if (!ws) return;

        getLobbyInfo();
        ws.onmessage = (event) => {
            const message = event.data;
            if (message) {
                if (message === "Se unió/abandonó jugador en lobby") {
                    getLobbyInfo();
                }
                if (message === "La partida inició") {
                    setActiveGame(true);
                }
                if (message === "La partida se canceló") {
                    setCancelGame(true);
                }
            }
        };
    }, [ws]);
    return { players, gameName, maxPlayers, activeGame, cancelGame };
};

export default useLobby;