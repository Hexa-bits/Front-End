import { leaveGame } from "../../hooks/Lobby/useLeaveGame.js";
import { HOME } from '../../utils/Constants.js';

global.fetch = vi.fn();

const mockAlert = vi.spyOn(global, 'alert').mockImplementation(() => {});
const mockNavigate = vi.fn();

beforeEach(() => {
    vi.clearAllMocks(); // Limpiar mocks antes de cada prueba
    localStorage.setItem('id_user', '123'); // Simular que hay un ID de usuario en el localStorage
});

describe('Función leaveGame', () => {
    it('Debe salir con éxito del juego y navegar.', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            statusText: 'OK',
        });

        await leaveGame('456', mockNavigate);

        expect(mockAlert).toHaveBeenCalledWith('Jugador 123 abandonaste el juego 456 exitosamente');
        expect(mockNavigate).toHaveBeenCalledWith(HOME);
    });

    it('Debe gestionar correctamente los errores del servidor.', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Internal Server Error',
            text: vi.fn().mockResolvedValueOnce('Error details from the server'),
        });

        await leaveGame('456', mockNavigate);

        expect(mockAlert).toHaveBeenCalledWith('No se pudo abandonar el juego. Error details from the server');
        expect(mockNavigate).not.toHaveBeenCalled(); // No debe navegar si hubo un error
    });

    it('Debe manejar errores de fetch.', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await leaveGame('456', mockNavigate);

        expect(mockAlert).toHaveBeenCalledWith('No se pudo abandonar el juego. Network error');
        expect(mockNavigate).not.toHaveBeenCalled(); // No debe navegar si hubo un error
    });
});
