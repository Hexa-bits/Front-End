
import { GET_MOVEMENTS_URL } from "../../utils/Constants.js";

export const useMovUrl = (playerId) => {
    return `${GET_MOVEMENTS_URL}?player_id=${playerId}`;
};