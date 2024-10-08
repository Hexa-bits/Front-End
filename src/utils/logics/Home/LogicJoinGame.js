import { useNavigate } from "react-router-dom";
import { useGameActions } from '../../../hooks/Home/useGamesAction';
import { LOBBY } from '../../../utils/Constants';

function useHomeLogic({ws, gameId, playerId})  {    
    const navigate = useNavigate();
    try {
        useGameActions(gameId, playerId);  // POSt request
        console.log("Navegando al lobby con gameId:", gameId);
        ws.close();
        navigate(LOBBY, {state: {isOwner:false, gameId }});
    }
    catch (error) {
        console.error("Error al unirse a la partida:", error);
    }
};

export default useHomeLogic;



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



