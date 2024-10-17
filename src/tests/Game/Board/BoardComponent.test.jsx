import { render, screen } from "@testing-library/react";
import Board from "../../../components/Game/Board/Board";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";

vi.mock("../../../services/Game/Board/useSelectedCards");

describe("Board Component", () => {
  it("Renderiza el tablero con datos de cartas simulados y verifica el color", () => {
    // Mockear los datos de las cartas
    const mockCardData = [
      { x: 0, y: 0, color: 1 },
      { x: 0, y: 1, color: 4 },
    ];

    useSelectedCards.mockReturnValue({
      selectedCards: [],
      handlerSelectedCard: vi.fn(),
    });

    // Crear una función mock para onSelectedCards
    const mockOnSelectedCards = vi.fn();

    render(
      <Board 
        isTurn={true} 
        cardData={mockCardData} 
        onSelectedCards={mockOnSelectedCards} // Agrega este prop
        game_id="test-game" // Asegúrate de proporcionar un game_id si es necesario
      />
    );

    // Obtener todas las cartas usando el role "button"
    const boxCards = screen.getAllByRole("button");

    expect(boxCards).toHaveLength(mockCardData.length);

    // Verifica los estilos de fondo de las cartas
    expect(boxCards[0]).toHaveStyle("background-color: #DC143C"); // Rojo Carmesí
    expect(boxCards[1]).toHaveStyle("background-color: #4169E1"); // Azul Real
    expect(mockOnSelectedCards).toHaveBeenCalledWith([]);
  });
});