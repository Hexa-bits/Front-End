import { GAME_START_URL, GAME } from '../../utils/Constants.js';
import { startGame } from "../../hooks/Lobby/useStartGame.js";

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('startGame', () => {
    const mockNavigate = vi.fn();
    const originalConsoleLog = console.log;

    beforeEach(() => {
        mockNavigate.mockClear();
        global.fetch = vi.fn();
        console.log = vi.fn(); 
    });

    afterEach(() => {
        vi.clearAllMocks();
        console.log = originalConsoleLog; 
    });

    it('Debe iniciar el juego y navegar a la página del juego.', async () => {
        const mockResponse = { ok: true };
        fetch.mockResolvedValueOnce(mockResponse);

        await startGame(7, mockNavigate);

        expect(fetch).toHaveBeenCalledWith(GAME_START_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game_id: 7 }),
        });

        expect(mockNavigate).toHaveBeenCalledWith(GAME);
        expect(console.log).toHaveBeenCalledWith('Juego 7 iniciado exitosamente');
    });

    it('Debe gestionar los errores y registrar un mensaje de error cuando la solicitud falla', async () => {
        const mockErrorMessage = 'Error de prueba';
        const mockResponse = {
            ok: false,
            text: vi.fn().mockResolvedValueOnce(mockErrorMessage),
        };
        fetch.mockResolvedValueOnce(mockResponse);

        await startGame(7, mockNavigate);

        // Verifica que se haya registrado el error
        expect(console.log).toHaveBeenCalledWith('No se pudo iniciar el juego. ' + mockErrorMessage);
        expect(mockNavigate).not.toHaveBeenCalled();  // No se debería llamar a navigate en caso de error
    });
});