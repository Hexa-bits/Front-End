import { useNameTurnPlayerUrl } from "./useTurnPlayerUrl.js";

const getTurnPlayer = async (gameId) => {
    const fullUrl = useNameTurnPlayerUrl(gameId);
    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { playerId: data.id_player, namePlayer: data.name_player }; 

    } catch (error) {
        console.error('Error fetching player turn:', error);
        return null;
    }
};

export default getTurnPlayer;
