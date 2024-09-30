import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Game from "../../containers/App/components/Game/Game.jsx";
import * as DataGameModule from "../../utils/logics/Game/DataGame.js";
import * as passTurnModule from "../../hooks/Game/passTurn.js";

jest.mock("../../utils/logics/Game/DataGame.js");
jest.mock("../../hooks/Game/passTurn.js");

describe("Game Component", () => {
  const localPlayerId = 1;

  beforeEach(() => {
    // Configura el mock de localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => localPlayerId.toString()),
      },
      writable: true,
    });

    // Configura los mocks para DataGame y passTurn
    DataGameModule.DataGame.mockReturnValue({
      movsIds: [1, 2],
      figsIds: [3, 4],
      currentPlayer: "Player 1",
      playerId: localPlayerId,
    });

    passTurnModule.passTurn.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the current player", () => {
    render(<Game />);

    expect(screen.getByText("Player 1")).toBeInTheDocument();
  });

  it("should render the figure cards", () => {
    render(<Game />);

    expect(screen.getByText(/FigCards/i)).toBeInTheDocument(); // Asegúrate de que FigCards tenga un texto visible para verificar
  });

  it("should call passTurn when End Turn button is clicked", async () => {
    render(<Game />);

    const endTurnButton = screen.getByRole("button", { name: /End Turn/i });

    await act(async () => {
      fireEvent.click(endTurnButton);
    });

    expect(passTurnModule.passTurn).toHaveBeenCalledTimes(1);
  });

  it("should disable the End Turn button for non-active players", () => {
    // Cambia el mock para simular que el jugador actual no es el jugador local
    DataGameModule.DataGame.mockReturnValueOnce({
      movsIds: [1, 2],
      figsIds: [3, 4],
      currentPlayer: "Player 2",
      playerId: 2,
    });

    render(<Game />);

    const endTurnButton = screen.getByRole("button", { name: /End Turn/i });
    
    expect(endTurnButton).toBeDisabled();
  });

  it("should render MovCards", () => {
    render(<Game />);

    expect(screen.getByText(/MovCards/i)).toBeInTheDocument(); // Asegúrate de que MovCards tenga un texto visible para verificar
  });

  it("should render LeaveButton", () => {
    render(<Game />);

    expect(screen.getByRole("button", { name: /Abandonar Juego/i })).toBeInTheDocument(); // Asegúrate de que LeaveButton tenga un texto visible
  });
});
