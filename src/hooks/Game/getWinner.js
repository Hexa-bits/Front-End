import { useEffect, useState } from 'react';
import { useWinner } from './useWinnerUrl.js';

const useWinnerPolling = (gameId, pollingInterval = 500) => {
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

            // Maneja el caso 204 No Content
            if (response.status === 204) {
                return false; 
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                return false;
            }

            return data;
        } catch (error) {
            return false; 
        }
    };

    useEffect(() => {
        const fetchWinner = async () => {
            const result = await getWinner();
            if (result) {
                setWinner(result); 
            }
        };

        fetchWinner(); // Llama inicialmente

        const interval = setInterval(fetchWinner, pollingInterval);

        return () => clearInterval(interval);
    }, [gameId, pollingInterval]);

    return winner;
};

export default useWinnerPolling;