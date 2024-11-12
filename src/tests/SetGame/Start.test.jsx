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
    expect(screen.getByLabelText("NOMBRE DE PARTIDA")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingrese un nombre")
    ).toBeInTheDocument();
    expect(
      screen.getByText("ELIGE CANTIDAD DE JUGADORES")
    ).toBeInTheDocument();
    expect(screen.getByText("CREAR PARTIDA")).toBeInTheDocument();
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
    fireEvent.click(screen.getByText("CREAR PARTIDA"));

    expect(useSetGame().handleClick).toHaveBeenCalledTimes(1);
  });
});
