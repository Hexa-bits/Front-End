import { getMovements } from '../../hooks/Game/getMovements.js';

vi.mock("../../hooks/Game/useMovUrl.js");

describe('Obtener cartas de movimiento', () => {
    beforeEach(() => {
        localStorage.setItem("id_user", "1"); // Simular que hay un usuario logueado
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('Debe devolver movs_ids cuando la llamada a la API tiene éxito.', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        const mockData = { id_mov_card: [1, 2, 3] };
        
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await getMovements();
        expect(result.movs_ids).toEqual([1, 2, 3]);

        consoleSpy.mockRestore(); // Restaurar el comportamiento de console.log
    });

    it('Debe devolver un arreglo vacío cuando falla la llamada a la API.', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        const result = await getMovements();
        expect(result.movs_ids).toEqual([]);  // Verificar que devuelve un array vacío

        consoleErrorSpy.mockRestore(); // Restaurar el comportamiento de console.error
    });
});
