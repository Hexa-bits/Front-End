import { HOME, GAME_LEAVE_URL } from '../../utils/Constants.js';

export const LeaveGame = (ws, navigate) => { 

    const leaveGame = async () => {
        const playerId = parseInt(localStorage.getItem('id_user'),10); 
        const gameId = parseInt(localStorage.getItem('game_id'), 10);
    
        try {
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
    
            // desde looby o game
            localStorage.removeItem('game_id');
    
            // solo game
            const active = localStorage.getItem('active');
            if (active) {localStorage.setItem('active', false);} 
            ws && ws.close();
            navigate(HOME);
        } catch (error) {
            alert("No se pudo abandonar el juego. " + error.message);
        }
    };
    return leaveGame;
};