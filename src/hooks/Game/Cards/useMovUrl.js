import {
  GET_MOVEMENTS_URL,
  GET_MOVEMENTS_URL_WS,
} from "../../../utils/Constants.js";

export const useMovUrl = (playerId) => {
  return `${GET_MOVEMENTS_URL}?player_id=${playerId}`;
};

export const useFigCardWs = (playerId) => {
  return `${GET_MOVEMENTS_URL_WS}?player_id=${playerId}`;
};
