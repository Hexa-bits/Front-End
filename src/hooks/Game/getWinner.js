import { useEffect, useState } from 'react';
import { useWinner } from './useWinnerUrl.js';

const useWinnerPolling = (gameId, pollingInterval = 5000) => {
    const [winner, setWinner] = useState(null);

    const getWinner = async () => {
        const fullUrl = useWinner(gameId);

        try {
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 204) {
                    return null; // No hay ganador
                }
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data; // Retorna el ganador si lo hay
        } catch (error) {
            console.error('Error fetching winner:', error);
            return null; // En caso de error
        }
    };

    useEffect(() => {
        const fetchWinner = async () => {
            const result = await getWinner();
            if (result) {
                setWinner(result); // Actualiza el ganador si se encuentra uno
            }
        };

        fetchWinner(); // Llama inicialmente

        const interval = setInterval(fetchWinner, pollingInterval); // Configura el polling

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [gameId, pollingInterval]);

    return winner; // Devuelve el ganador
};

export default useWinnerPolling;
