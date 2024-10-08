import { useNavigate } from "react-router-dom";
import { LOBBY } from '../../Constants';
import { GAME_JOIN_URL } from '../../../utils/Constants';

//Devuelve la función joinGame que se encarga de unir al jugador a la partida
const JoinGame = (ws) => {    
    const navigate = useNavigate();

    const joinGame = async (gameId, playerId) => {
        try {
            const response = await fetch(GAME_JOIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ game_id: gameId, player_id: playerId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al unirse a la partida: ${errorData.message || 'No se pudo unirse'}`);
            }

            const data = await response.json();
            console.log("Unido a la partida con éxito:", data);
            localStorage.setItem('game_id', gameId);

            // Lógica de navegación
            console.log("Navegando al lobby con gameId:", gameId);
            ws.close();
            navigate(LOBBY, { state: { isOwner: false, gameId } });

            return data;
        } catch (error) {
            console.error("Error al unirse a la partida:", error);
            throw error;
        }
    };

    return { joinGame };
};

export default JoinGame;



// export const useHomeLogic = ({ws}) => {    
//     const navigate = useNavigate();
//     const { joinGame } = useGameActions();
//     const playerId = parseInt(localStorage.getItem("id_user"),10);
    
//     const handleJoinGame = (gameId) =>{
//         console.log("Navegando al lobby con gameId:", gameId);
//         ws.close();
//         navigate(LOBBY, {state: {isOwner:false, gameId }});
//     }
//       const handleJoin = async (gameId) => {
//         try {
//             const result = await joinGame(gameId, playerId);
//             handleJoinGame(gameId);
//         } catch (error) {
//             console.error("Error al unirse a la partida:", error);
//         }
//     };

//     return { handleJoin };
// };



