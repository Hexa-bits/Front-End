import { GET_FIGURES_URL } from "../../utils/Constants.js";

export const useFigCardUrl = (playerId) => {
    return `${GET_FIGURES_URL}?player_id=${playerId}`;
};