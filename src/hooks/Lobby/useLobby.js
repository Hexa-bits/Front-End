import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME } from '../../utils/Constants.js';

export const useLobby = ((fullUrl, gameId) => {
    const [players, setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [activeGame , setActiveGame] = useState(false); 

    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        interval = setInterval(getGameInfo, 1000);
        // if (!activeGame) {
        // } 
        
        return () => clearInterval(interval); 
    }, [fullUrl, gameId, activeGame]);

    async function getGameInfo() {
        try {
            const response = await fetch(fullUrl, {
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
            setActiveGame(data.game_status); 


            // Verifica si el juego ha comenzado
            if (activeGame === true) {
                sessionStorage.setItem('active', true);
                navigate(GAME); 
            }

        } catch (error) {
            console.log("Error al obtener información del juego. " + error.message);
        }
    }

    return {players, gameName, maxPlayers, activeGame};
});








































// import { useState, useEffect } from "react";


// export const useLobby = ((fullUrl) => {
//     const [players, setPlayers] = useState([]);
//     const [gameName, setGameName] = useState('');
//     const [maxPlayers, setMaxPlayers] = useState(0);


//     useEffect(() => {
//         getGameInfo();
//         const interval = setInterval(getGameInfo, 500);
//         return () => clearInterval(interval);
//     }, []);

//     async function getGameInfo() {
//         try {
//             const response = await fetch(fullUrl, {
//                 method: "GET",
//             });
//             if (!response.ok) {
//                 throw new Error("Error al obtener información del juego.");
//             }
//             const data = await response.json();

//             console.log("Obteniendo información del juego...");

//             setPlayers(data.name_players || []);
//             setGameName(data.game_name);
//             setMaxPlayers(data.max_players);

//         } catch (error) {
//             console.log("Error al obtener información del juego. " + error.message);
//         }
//     }
//     return {players, gameName, maxPlayers};
// });   
