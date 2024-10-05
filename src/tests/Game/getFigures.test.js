import { getFigureCards } from '../../hooks/Game/getFigureCards.js';
import { useFigCardUrl } from '../../hooks/Game/useFigCardUrl.js';

vi.mock("../../hooks/Game/useFigCardUrl.js");

describe('Obtener Cartas Figura', () => {
    beforeEach(() => {
        localStorage.setItem("id_user", "1"); // Simular que hay un usuario logueado
        useFigCardUrl.mockReturnValue("http://127.0.0.1:8000/game/my-fig-card/?player_id=1"); // Simular la URL de la API
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('Debe devolver figs_ids cuando la llamada a la API se realiza correctamente.', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        const mockData = { id_fig_card: [1, 2, 3] };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([1, 2, 3]);

        consoleSpy.mockRestore(); // Restaurar el comportamiento de console.log
    });

    it('Debe devolver un arreglo vacío cuando falla la llamada a la API.', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([]); // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });

    it('Debe devolver un arreglo vacío cuando se produce un error.', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = vi.fn(() =>
            Promise.reject(new Error("Network Error"))
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([]); // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });
});
