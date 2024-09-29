import React from 'react';
import { render } from '@testing-library/react';
import MovCards from '../../components/Game/MovCards/MovCards.jsx';
import '@testing-library/jest-dom';



describe('MovCards component', () => {
    it('should render the correct number of movement cards', () => {
        const cardsIds = [1, 2, 3];
        const { getByAltText } = render(<MovCards cardsIds={cardsIds} />);

        // Verificar que las imágenes correctas son renderizadas
        expect(getByAltText('mov1')).toBeInTheDocument();
        expect(getByAltText('mov2')).toBeInTheDocument();
        expect(getByAltText('mov3')).toBeInTheDocument();
    });
});
