import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';

function useGames(initialGames = []) {
    const [games, setGames] = useState(initialGames);
    const [error, setError] = useState(false);

    const fetchGames = async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
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

    useEffect(() => {
        fetchGames();
        const intervalId = setInterval(fetchGames, 2000); // 2 segundos
        return () => clearInterval(intervalId);
    }, []);


    const handleJoin = () => {};
    /*const handleJoin = (id) => {
        setGames(prevGames =>
            prevGames.map(game =>
                game.game_id === id && game.current_players < game.max_players
                    ? { ...game, current_players: game.current_players + 1 }
                    : game
            )
        );
    };*/

    return { games, handleJoin}; // Devuelve el error si lo necesitas
}

export default useGames;
