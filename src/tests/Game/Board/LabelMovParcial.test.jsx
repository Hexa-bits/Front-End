import { beforeEach, expect, it } from 'vitest';
import LabelMovParcial from "../../../components/Game/Board/LabelMovParcial/LabelMovParcial";
import { render, screen } from '@testing-library/react';

vi.mock("../../../services/Game/Board/useSelectedCards");

describe("Componente LabelMov Parcial", () => {
    beforeEach(()=>{
        vi.useFakeTimers();
    });

    afterEach(()=>{
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('Debería renderizar el label.', () =>{
        render(<LabelMovParcial isVisible={true} />);
        const element = screen.getByText('Parcial');
        expect(element).toHaveClass('visible');
        expect(element).not.toHaveClass('hiding');
    });

    it('No debería renderizar el label.', () =>{
        render(<LabelMovParcial isVisible={false} />);
        const element = screen.getByText('Parcial');
        expect(element).not.toHaveClass('visible');
        expect(element).toHaveClass('hiding');
    });
});