import { render, act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import getFormedFig from '../../../services/Game/Board/Highlight Figs/formedFig';

// Crea un componente de prueba que utilice el hook
function TestComponent({ game_id }) {
    const formedFig = getFormedFig(game_id);
    return (
        <div>
            {formedFig.map((fig, index) => (
                <div key={index}>{fig}</div>
            ))}
        </div>
    );
}

global.fetch = vi.fn();

describe('getFormedFig', () => {
    afterEach(() => {
        vi.clearAllMocks(); 
    });

    it('Debería obtener cartas resaltadas correctamente', async () => {
        const mockData = ['figura1', 'figura2'];
        const game_id = '123';

        fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        await act(async () => {
            render(<TestComponent game_id={game_id} />);
        });

        expect(await screen.findByText('figura1')).toBeInTheDocument();
        expect(await screen.findByText('figura2')).toBeInTheDocument();
    });

    it('No debe intentar buscar figuras si game_id no está definido', async () => {
        await act(async () => {
            render(<TestComponent game_id={null} />);
        });
        expect(fetch).not.toHaveBeenCalled();
    });

    it('Debería manejar el caso cuando no se devuelve figura resaltada', async () => {
        const mockData = []; // Sin datos
        const game_id = '123';

        fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        await act(async () => {
            const { queryByText } = render(<TestComponent game_id={game_id} />);
            expect(queryByText('figura1')).not.toBeInTheDocument();
            expect(queryByText('figura2')).not.toBeInTheDocument();
        });
    });
});