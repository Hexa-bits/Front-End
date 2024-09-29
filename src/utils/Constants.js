export const PORT = 8000;

/** NAVEGACION */
export const LOGIN = '/login';
export const HOME = '/home';
export const GAME = '/game';
export const LOBBY = '/home/lobby';
export const SETGAME = '/home/create-config';

/** URLS */
export const CONFIG_URL = `http://localhost:${PORT}/home/create-config`;
export const LOGIN_URL = `http://localhost:${PORT}${LOGIN}`;
export const LOBBY_URL = `http://localhost:${PORT}${LOBBY}`;
export const HOME_URL = `http://localhost:${PORT}${HOME}/get-lobbies`;
export const GAME_JOIN_URL = `http://localhost:${PORT}${GAME}/join`;
export const GAME_LEAVE_URL = `http://localhost:${PORT}/game/leave`;
export const GAME_START_URL = `http://localhost:${PORT}/game/start-game`;

/** MENSAJES */
export const LoginHelpText = "Debe tener entre 1 y 10 caracteres.";

/** Otras constantes */
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;