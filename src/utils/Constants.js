export const PORT = 8000;

/** NAVEGACION */
export const LOGIN = "/login";
export const HOME = "/home";
export const GAME = "/game";
export const LOBBY = "/home/lobby";
export const SETGAME = "/home/create-config";

/** URLS */
export const CONFIG_URL = `http://localhost:${PORT}/home/create-config`;
export const LOGIN_URL = `http://localhost:${PORT}${LOGIN}`;
export const LOBBY_URL = `http://localhost:${PORT}${LOBBY}?game_id=`;
export const HOME_URL = `http://localhost:${PORT}${HOME}/get-lobbies`;
export const GAME_JOIN_URL = `http://localhost:${PORT}${GAME}/join`;
export const GAME_LEAVE_URL = `http://localhost:${PORT}${GAME}/leave`;
export const GAME_START_URL = `http://localhost:${PORT}${GAME}/start-game`;
export const GET_MOVEMENTS_URL = `http://localhost:${PORT}${GAME}/my-mov-card?player_id=`;
export const GET_FIGURES_URL = `http://localhost:${PORT}${GAME}/my-fig-card?player_id=`;
export const GET_TURN_PLAYER_URL = `http://localhost:${PORT}${GAME}/current-turn?game_id=`;
export const GET_WINNER_URL = `http://localhost:${PORT}${GAME}/get-winner`;
export const GAME_PASS_URL = `http://localhost:${PORT}${GAME}/end-turn`;

/** WEBSOCKETS */
export const WS_GAME = `ws://localhost:${PORT}${GAME}?game_id=`;
export const WS_HOME = `ws://localhost:${PORT}${HOME}`;
export const WS_LOBBY_URL = `ws://localhost:${PORT}${LOBBY}?game_id=`;

/** MENSAJES */
export const LoginHelpText = "Debe tener entre 1 y 10 caracteres.";

/** Otras constantes */
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;
