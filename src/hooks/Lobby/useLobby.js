import { useState, useEffect } from 'react';
import { fetchGameInfo } from "./useFetch.js" 

export const useLobby = (fullUrl) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);

    useEffect(() => {
        const getGameData = async () => {
            try {
                const data = await fetchGameInfo(fullUrl);
                setPlayers(data.name_players || []);
                setGameName(data.game_name);
                setMaxPlayers(data.max_players); 
            } catch (error) {
                alert("Error al obtener información del juego: " + error.message);
            }
        };

        getGameData();
        const interval = setInterval(getGameData, 500);
        return () => clearInterval(interval);
    }, [fullUrl]);

    return { players, gameName, maxPlayers };
};


