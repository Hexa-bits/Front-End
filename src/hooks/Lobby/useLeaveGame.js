import { HOME, GAME_LEAVE_URL } from '../../utils/Constants.js';

export const leaveGame = async (gameId, navigate) => {
    try {
        const playerId = parseInt(localStorage.getItem('id_user'),10); 
        const response = await fetch(GAME_LEAVE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game_id: gameId, id_user: playerId }),
        });
    
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || response.statusText);
        }
    
        alert(`Jugador ${playerId} abandonaste el juego ${gameId} exitosamente`);
        
        sessionStorage.removeItem('game_id');
        if (sessionStorage.getItem('active')) {sessionStorage.removeItem('active');} 
        // localStorage.removeItem('game_id');

        navigate(HOME);
    } catch (error) {
        alert("No se pudo abandonar el juego. " + error.message);
    }
    
};