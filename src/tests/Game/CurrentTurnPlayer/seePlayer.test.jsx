import { render, screen } from '@testing-library/react';
import SeePlayer from '../../../components/Game/seePlayer_Turn/seePlayer.jsx';


describe('Componente SeePlayer', () => {
    test('Debería renderizar correctamente el jugador actual.', () => {
        const mockPlayer = 'Player1';

        // Renderizar el componente con la prop `player`
        render(<SeePlayer player={mockPlayer} />);

        // Comprobar que el texto "Turno de Player1" está en el documento
        const seePlayerElement = screen.getByText(`Turno de ${mockPlayer}`);
        expect(seePlayerElement).toBeInTheDocument();
    });
});
