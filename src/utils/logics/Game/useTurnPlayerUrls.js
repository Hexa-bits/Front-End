import { GET_TURN_PLAYER_URL, GAME_TURN_PLAYER_WS_URL } from "../../utils/Constants.js";

export const useNameTurnPlayerUrl = (gameId) => {
    return `${GET_TURN_PLAYER_URL}?game_id=${gameId}`;
};

export const useNameTurnPlayerUrl_WS = (gameId) =>{
    return `${GAME_TURN_PLAYER_WS_URL}/info?game_id=${gameId}`;
};