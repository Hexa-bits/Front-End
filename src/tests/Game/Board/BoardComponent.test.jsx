import { render, screen } from "@testing-library/react";
import Board from "../../../components/Game/Board/Board";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";

// Mock de useSelectedCards
vi.mock("../../../services/Game/Board/useSelectedCards", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Board Component", () => {
  it("Renderiza el tablero con datos de cartas simulados y verifica el color", () => {
    const mockCardData = [
      { x: 0, y: 0, color: 1 }, // Asegúrate de que el índice sea correcto en COLORMAP_BOXCARDS
      { x: 0, y: 1, color: 2 },
    ];

    const mockFormedFigs = [
      [{ x: 0, y: 0, color: 1 }], // Asegúrate de que esto coincida con tus datos
    ];

    useSelectedCards.mockReturnValue({
      selectedCards: [],
      handlerSelectedCard: vi.fn(),
    });

    const mockOnSelectedCards = vi.fn();

    render(
      <Board 
        isTurn={true} 
        cardData={mockCardData} 
        onSelectedCards={mockOnSelectedCards}
        formedFigs={mockFormedFigs}
        game_id="test-game"
      />
    );

    const boxCards = screen.getAllByRole("button");

    expect(boxCards).toHaveLength(mockCardData.length);

    // Verifica los estilos de fondo de las cartas
    expect(boxCards[0]).toHaveStyle(`background-color: #DC143C`); // Color del primer BoxCard
    expect(boxCards[1]).toHaveStyle(`background-color: #50C878`); // Color del segundo BoxCard
    expect(mockOnSelectedCards).toHaveBeenCalledWith([]);
  });

  it("Resalta correctamente las cartas según formedFigs", () => {
    const mockCardData = [
      { x: 0, y: 0, color: 1 },
      { x: 0, y: 1, color: 2 },
      { x: 1, y: 0, color: 3 },
    ];

    const mockFormedFigs = [
      [{ x: 0, y: 0, color: 1 }],
      [{ x: 1, y: 0, color: 3 }]
    ];

    useSelectedCards.mockReturnValue({
      selectedCards: [],
      handlerSelectedCard: vi.fn(),
    });

    const mockOnSelectedCards = vi.fn();

    render(
      <Board 
        isTurn={true} 
        cardData={mockCardData} 
        onSelectedCards={mockOnSelectedCards}
        formedFigs={mockFormedFigs}
      />
    );

    const boxCards = screen.getAllByRole("button");

    // Verifica que las cartas resaltadas tengan el color correspondiente
    expect(boxCards[0]).toHaveStyle(`background-color: #DC143C`); // Debe estar resaltado
    expect(boxCards[1]).toHaveStyle(`background-color: #50C878`); // No debe estar resaltado
    expect(boxCards[2]).toHaveStyle(`background-color: #FFD700`); // Debe estar resaltado
  });
});