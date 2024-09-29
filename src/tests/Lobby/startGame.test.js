import { startGame } from "../../hooks/Lobby/useStartGame.js";  // Actualiza con la ruta correcta
import { GAME_START_URL, GAME } from '../../utils/Constants.js';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('startGame', () => {
    const mockNavigate = jest.fn();
    const originalConsoleLog = console.log;

    beforeEach(() => {
        mockNavigate.mockClear();
        global.fetch = jest.fn();  // Mockear fetch para evitar llamadas reales a la API
        console.log = jest.fn();  // Mockear console.log
    });

    afterEach(() => {
        jest.clearAllMocks();
        console.log = originalConsoleLog;  // Restaurar console.log original
    });

    it('should start the game and navigate to the game page on success', async () => {
        const mockResponse = { ok: true };
        fetch.mockResolvedValueOnce(mockResponse);

        await startGame(7, mockNavigate);

        // Verifica que la solicitud fue hecha correctamente
        expect(fetch).toHaveBeenCalledWith(GAME_START_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game_id: 7 }),
        });

        // Verifica que se haya llamado a navigate
        expect(mockNavigate).toHaveBeenCalledWith(GAME);
        expect(console.log).toHaveBeenCalledWith('Juego 7 iniciado exitosamente');
    });

    it('should handle errors and log an error message when the request fails', async () => {
        const mockErrorMessage = 'Error de prueba';
        const mockResponse = {
            ok: false,
            text: jest.fn().mockResolvedValueOnce(mockErrorMessage),
        };
        fetch.mockResolvedValueOnce(mockResponse);

        await startGame(7, mockNavigate);

        // Verifica que se haya registrado el error
        expect(console.log).toHaveBeenCalledWith('No se pudo iniciar el juego. ' + mockErrorMessage);
        expect(mockNavigate).not.toHaveBeenCalled();  // No se debería llamar a navigate en caso de error
    });
});