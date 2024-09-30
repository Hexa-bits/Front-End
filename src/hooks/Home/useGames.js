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
                setError(null); // Resetea el error si la petición es exitosa
            } catch (error) {
                console.error("Error fetching lobbies:", error);
                setError(error.message); // Guarda el mensaje de error en el estado
            }
        };

        fetchGames();
    }, []); // Esto se ejecuta solo una vez, cuando el componente se monta

    useEffect(() => {
        const ws = new WebSocket(HOME_URL_WS);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
            try {
                // Reemplaza las comillas simples por comillas dobles
                const formattedString = event.data.replace(/'/g, '"');

                // Intenta parsear el string JSON
                const gamesData = JSON.parse(formattedString);

                console.log('Games:', gamesData.length); // Muestra la longitud del array de juegos
                setGames(gamesData); // Actualiza el estado de juegos
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
    }, []);

    return { games, error };
}

export default useGames;
// 

// import { useState } from 'react';
// import { HOME_URL } from '../../utils/Constants.js';
// import usePooling from './usePooling.js'

// function useGames(initialGames = []) {
//     const [games, setGames] = useState(initialGames);
//     const [error, setError] = useState(null); // Cambia el estado inicial a null

//     const fetchGames = async () => {
//         try {
//             const response = await fetch(`${HOME_URL}`);
//             if (!response.ok) {
//                 throw new Error('Error en la respuesta del servidor');
//             }
//             const data = await response.json();

//             setGames(data);
//             setError(null); // Resetea el error si la petición es exitosa
//         } catch (error) {
//             console.error("Error fetching lobbies:", error);
//             setError(error.message); // Guarda el mensaje de error en el estado
//         }
//     };

//     usePooling(fetchGames, 500);

//     return { games, error }; // Retorna el error
// }

// export default useGames;

