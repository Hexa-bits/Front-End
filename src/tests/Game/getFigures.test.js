import { getFigureCards } from '../../hooks/Game/getFigureCards.js';
import { useFigCardUrl } from '../../hooks/Game/useFigCardUrl.js';
import '@testing-library/jest-dom';

jest.mock("../../hooks/Game/useFigCardUrl.js");

describe('getFigureCards', () => {
    beforeEach(() => {
        localStorage.setItem("id_user", "1"); // Simular que hay un usuario logueado
        useFigCardUrl.mockReturnValue("http://127.0.0.1:8000/game/my-fig-card/?player_id=1"); // Simular la URL de la API
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should return figs_ids when API call is successful', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const mockData = { id_fig_card: [1, 2, 3] };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([1, 2, 3]);

        consoleSpy.mockRestore(); // Restaurar el comportamiento de console.log
    });

    it('should return an empty array when API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([]); // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });

    it('should return an empty array when an error occurs', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.reject(new Error("Network Error"))
        );

        const result = await getFigureCards();
        expect(result.figs_ids).toEqual([]); // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });
});
