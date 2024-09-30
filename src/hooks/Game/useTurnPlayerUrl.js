import { GET_TURN_PLAYER_URL } from "../../utils/Constants.js";

export const useNameTurnPlayerUrl = (gameId) => {
    return `${GET_TURN_PLAYER_URL}?game_id=${gameId}`;
};