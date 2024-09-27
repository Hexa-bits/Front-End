import { useState, useEffect } from 'react';
import { HOME_URL } from '../../utils/Constants.js';
import usePooling from './usePooling.js'

function useGames(initialGames = []) {
    const [games, setGames] = useState(initialGames);
    const [error, setError] = useState(false);

    const fetchGames = async () => {
        try {
            const response = await fetch(`${HOME_URL}`);
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

    usePooling(fetchGames, 2000);

    const handleJoin = () => {};

    return { games, handleJoin}; // Devuelve el error si lo necesitas
}

export default useGames;