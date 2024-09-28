import { useState, useEffect } from "react";

export const useLobby = ((fullUrl) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);


    useEffect(() => {
        const getGameInfo = async () => {
            try {
                const response = await fetch(fullUrl);
                if (!response.ok) {
                    throw new Error("Error al obtener información del juego.");
                }
                const data = await response.json();

                console.log("Obteniendo información del juego...");

                setPlayers(data.name_players || []);
                setGameName(data.game_name);
                setMaxPlayers(data.max_players);
            } catch (error) {
                alert("Error al obtener información del juego. " + error.message);
            }
        };

        getGameInfo();
        const interval = setInterval(getGameInfo, 500);
        return () => clearInterval(interval);
    }, [fullUrl]);

    // async function getGameInfo() {
    //     try {
    //         const response = await fetch(fullUrl);
    //         if (!response.ok) {
    //             throw new Error("Error al obtener información del juego.");
    //         }
    //         const data = await response.json();

    //         console.log("Obteniendo información del juego...");

    //         setPlayers(data.name_players || []);
    //         setGameName(data.game_name);
    //         setMaxPlayers(data.max_players);

    //     } catch (error) {
    //         alert("Error al obtener información del juego. " + error.message);
    //     }
    // }
    return {players, gameName, maxPlayers};
});   

