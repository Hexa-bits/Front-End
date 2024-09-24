import { HOME, GAME_LEAVE_URL } from '../../utils/Constants.js';

import fetchMock from 'fetch-mock';
fetchMock.put(GAME_LEAVE_URL, 200);   

export const leaveGame = async (gameId, navigate) => {
    try {
        const playerId = localStorage.getItem('id_usser');
        const response = await fetch(GAME_LEAVE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game_id: gameId, id_player: playerId }),
        });

        if (!response.ok) {
            throw new Error('Error al abandonar el juego');
        }
        alert(`Jugador ${playerId} abandonaste el juego ${gameId} exitosamente`);
        navigate(HOME);
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo abandonar el juego. " + error.message);
    }
};