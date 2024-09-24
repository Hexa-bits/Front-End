export const PORT = 8000;

/** NAVEGACION */
export const LOGIN = '/login';
export const HOME = '/home/get-lobbies';
export const GAME = '/game';
export const LOBBY = '/home/lobby';

/** URLS */
export const LOGIN_URL = `http://localhost:${PORT}${LOGIN}`;
export const LOBBY_URL = `http://localhost:${PORT}${LOBBY}`;
export const HOME_URL = `http://localhost:${PORT}${HOME}`;
export const GAME_LEAVE_URL = `http://localhost:${PORT}/game/leave`;

/** MENSAJES */
export const LoginHelpText = "Debe tener entre 1 y 10 caracteres.";

/** Otras constantes */
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;
