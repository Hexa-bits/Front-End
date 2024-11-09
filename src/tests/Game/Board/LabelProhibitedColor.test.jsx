import { render, screen, act, waitFor } from '@testing-library/react';
import LabelProhibitedColor from '../../../components/Game/Board/LabelProhibitedColor/LabelProhibitedColor';

describe("LabelProhibitedColor Component", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('Should render the label with the color mapped correctly when the color is valid.', () => {
        render(<LabelProhibitedColor color={1} />);
        const boxElement = screen.getByText('Bloqueado');
        expect(boxElement).toHaveStyle({ backgroundColor: 'colorMapValor' });
        const container = boxElement.closest('.labelProhibitedColor');
        expect(container).toHaveClass('visible');
        expect(container).not.toHaveClass('hiding');
    });

    it('Should not render the label when the color is invalid.', () => {
        render(<LabelProhibitedColor color={0} />);        
        let boxElement = screen.getByText('Bloqueado');
        let container = boxElement.closest('.labelProhibitedColor');
        expect(container).not.toHaveClass('visible');
        expect(container).toHaveClass('hiding');
    });

    it('Should show the label when changing the color from invalid to valid.', () => {
        const { rerender } = render(<LabelProhibitedColor color={0} />);
        const boxElement = screen.getByText('Bloqueado');
        const container = boxElement.closest('.labelProhibitedColor');
        
        // Verifica que inicialmente esté oculto
        expect(container).not.toHaveClass('visible');
        expect(container).toHaveClass('hiding');

        // Cambia el color a un valor válido
        rerender(<LabelProhibitedColor color={1} />);

        // Verifica que ahora esté visible
        expect(container).toHaveClass('visible');
        expect(container).not.toHaveClass('hiding');
    });
});
