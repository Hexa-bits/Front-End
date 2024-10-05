import { GAME_START_URL, GAME } from '../../utils/Constants.js';
import { useNavigate } from 'react-router-dom';

export const StartGame = () => { 
    const navigate = useNavigate();
    
    const startGame = async () => {
        const game_id = parseInt(localStorage.getItem("game_id"), 10);
    
        try {
            const response = await fetch(GAME_START_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ game_id: game_id }),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || response.statusText);
            }
            console.log(`Juego ${game_id} iniciado exitosamente`);
            localStorage.setItem('active', true);
            navigate(GAME);
        }
        catch (error) {
            console.log("No se pudo iniciar el juego. " + error.message);
        }
    };
        
    return startGame; 
};


