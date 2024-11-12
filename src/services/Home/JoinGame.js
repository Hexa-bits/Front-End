import { GAME, LOBBY } from '../../utils/Constants';
import { GAME_JOIN_URL } from '../../utils/Constants';

//Devuelve la función joinGame que se encarga de unir al jugador a la partida
const joinGame = async (game, playerId, password, navigate) => {  
    const gameId = game.game_id;

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
        console.log(`Unido a la partida ${gameId} con éxito`);
        sessionStorage.setItem('game_id', gameId);
        sessionStorage.setItem('game_name', game.game_name);

        if (data.player_id ) {
            sessionStorage.setItem('player_id', data.player_id);
            console.log("Navegando al juego");
            navigate(GAME, { state: { samePlayer: true } });
            return true;
        }

        // Lógica de navegación
        console.log("Navegando al lobby");
        navigate(LOBBY, { state: { isOwner: false, gameId } });

        return true;

    } catch (error) {
        console.error("Error al unirse a la partida:", error);
        return false;
    }
};

export default joinGame;