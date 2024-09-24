
import { LOBBY_URL } from "../../utils/Constants.js";

export const useGameIdUrl = (gameId) => {
    return `${LOBBY_URL}?game_id=${gameId}`;
};
