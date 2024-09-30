import { GET_WINNER_URL } from '../../utils/Constants.js';

export const useWinner = (gameId) => {
    return `${GET_WINNER_URL}?game_id=${gameId}`;
};