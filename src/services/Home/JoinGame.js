import { useNavigate } from "react-router-dom";
import { LOBBY } from '../../utils/Constants';
import { GAME_JOIN_URL } from '../../utils/Constants';

//Devuelve la función joinGame que se encarga de unir al jugador a la partida
const  joinGame = async (gameId, playerId, password = '', navigate) => {    

    try {
        const response = await fetch(GAME_JOIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                game_id: gameId, 
                player_id: playerId,
                game_password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al unirse a la partida: ${errorData.message || 'No se pudo unirse'}`);
        }

        const data = await response.json();
        console.log("Unido a la partida con éxito:", data);
        sessionStorage.setItem('game_id', gameId);

        // Lógica de navegación
        console.log("Navegando al lobby");
        navigate(LOBBY, { state: { isOwner: false, gameId } });

        return data;

    } catch (error) {
        console.error("Error al unirse a la partida:", error);
    }
};

export default joinGame;