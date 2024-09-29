import { getMovements } from '../../hooks/Game/getMovements.js';
import '@testing-library/jest-dom';

jest.mock("../../hooks/Game/useMovUrl.js");

describe('getMovements', () => {
    beforeEach(() => {
        localStorage.setItem("id_user", "1"); // Simular que hay un usuario logueado
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should return cards_ids when API call is successful', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const mockData = { id_mov_card: [1, 2, 3] };
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await getMovements();
        expect(result.cards_ids).toEqual([1, 2, 3]);

        consoleSpy.mockRestore(); // Restaurar el comportamiento de console.log
    });

    it('should return an empty array when API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        const result = await getMovements();
        expect(result.cards_ids).toEqual([]);  // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });
});
