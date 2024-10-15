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
export const GET_WINNER_URL = `http://localhost:${PORT}${GAME}/get-winner?game_id=`;
export const GET_TURN_PLAYER_URL = `http://localhost:${PORT}${GAME}/current-turn?game_id=`;
export const GAME_PASS_URL = `http://localhost:${PORT}${GAME}/end-turn`;
export const GAME_BOARD_URL = `http://localhost:${PORT}${GAME}/board?game_id=`;
export const USE_MOV_CARD = `http://localhost:${PORT}${GAME}/use-mov-card`;
export const USE_FIG_CARD = `http://localhost:${PORT}${GAME}/use-fig-card`;


/** WEBSOCKETS */
export const WS_GAME = `ws://localhost:${PORT}${GAME}?game_id=`;
export const WS_HOME = `ws://localhost:${PORT}${HOME}`;

/** MENSAJES */
export const LoginHelpText = "Debe tener entre 1 y 10 caracteres.";
export const GAME_INFO_WS = `ws://localhost:${PORT}${GAME}/info`;

/** Otras constantes */
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;

//A modo de Ejemplo
export const cardData = [
    { x: 0, y: 0, color: 'red' },
    { x: 0, y: 1, color: 'red' },
    { x: 0, y: 2, color: 'red' },
    { x: 0, y: 3, color: 'red' },
    { x: 0, y: 4, color: 'red' },
    { x: 0, y: 5, color: 'red' },
    { x: 1, y: 0, color: 'blue' },
    { x: 1, y: 1, color: 'blue' },
    { x: 1, y: 2, color: 'blue' },
    { x: 1, y: 3, color: 'blue' },
    { x: 1, y: 4, color: 'blue' },
    { x: 1, y: 5, color: 'blue' },
    { x: 2, y: 0, color: 'green' },
    { x: 2, y: 1, color: 'green' },
    { x: 2, y: 2, color: 'green' },
    { x: 2, y: 3, color: 'green' },
    { x: 2, y: 4, color: 'green' },
    { x: 2, y: 5, color: 'green' },
    { x: 3, y: 0, color: 'yellow' },
    { x: 3, y: 1, color: 'yellow' },
    { x: 3, y: 2, color: 'yellow' },
    { x: 3, y: 3, color: 'yellow' },
    { x: 3, y: 4, color: 'yellow' },
    { x: 3, y: 5, color: 'yellow' },
    { x: 4, y: 0, color: 'red' },
    { x: 4, y: 1, color: 'red' },
    { x: 4, y: 2, color: 'red' },
    { x: 4, y: 3, color: 'red' },
    { x: 4, y: 4, color: 'red' },
    { x: 4, y: 5, color: 'red' },
    { x: 5, y: 0, color: 'blue' },
    { x: 5, y: 1, color: 'blue' },
    { x: 5, y: 2, color: 'blue' },
    { x: 5, y: 3, color: 'blue' },
    { x: 5, y: 4, color: 'blue' },
    { x: 5, y: 5, color: 'blue' },
];