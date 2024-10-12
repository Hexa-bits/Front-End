import React from "react";
import Start from "../../containers/App/components/SetGame/setGame";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSetGame } from "../../services/Setgame/useSetGame";

// Mockear el hook useSetGame
vi.mock("../../services/Setgame/useSetGame");

describe("Component Start", () => {
  beforeEach(() => {
    useSetGame.mockReturnValue({
      game_name: "",
      setGameName: vi.fn(),
      max_players: 0,
      setMaxPlayers: vi.fn(),
      handleClick: vi.fn(),
    });
  });

  test("Debe renderizar el componente Start.", () => {
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Nombre de la partida")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingrese un nombre")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Elige la cantidad de participantes")
    ).toBeInTheDocument();
    expect(screen.getByText("Crear Partida")).toBeInTheDocument();
  });

  test("Debe llamar handleClick al hacer clic en Crear Partida.", () => {
    useSetGame.mockReturnValue({
      game_name: "Juego Test",
      setGameName: vi.fn(),
      max_players: 2,
      setMaxPlayers: vi.fn(),
      handleClick: vi.fn(),
    });
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Crear Partida"));

    expect(useSetGame().handleClick).toHaveBeenCalledTimes(1);
  });
});
