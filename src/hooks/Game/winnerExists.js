import { useEffect, useState } from 'react';
import { GET_WINNER_URL } from '../../utils/Constants.js';


function WinnerExists (ws, gameId) {

    const [winnerName, setWinner] = useState(null);

    const getWinner = async () => {
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
    };

    useEffect(() => {
        if (!ws) return;
        ws.onmessage = (event) => {
            const message = event.data;
            if (message === "Hay Ganador") { 
                console.log("Hay Ganador"); 
                getWinner(); 
            }
        };
    }, [ws]);

    return { winnerName } ;
};

export default WinnerExists;

