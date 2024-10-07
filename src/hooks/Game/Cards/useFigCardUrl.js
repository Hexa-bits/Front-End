import {
  GET_FIGURES_URL,
  GET_FIGURES_URL_WS,
} from "../../../utils/Constants.js";

export const useFigCardUrl = (playerId) => {
  return `${GET_FIGURES_URL}?player_id=${playerId}`;
};
export const useFigCardWs = (playerId) => {
  return `${GET_FIGURES_URL_WS}?player_id=${playerId}`;
};
