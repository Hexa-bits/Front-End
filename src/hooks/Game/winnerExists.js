import { useState, useCallback } from 'react';
import { GET_WINNER_URL } from '../../utils/Constants.js';

function WinnerExists (gameId) {
    const [winnerName, setWinner] = useState(null);
    
    const getWinner = useCallback( async () => {
        try {
            const response = await fetch(GET_WINNER_URL + gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            const data = await response.json();
            setWinner(data.name_player);
        } catch (error) {
            console.error('Error fetching winner:', error);
        }
    }, [gameId]);

    return { winnerName , getWinner } ;
};

export default WinnerExists;