import { render, screen } from "@testing-library/react";
import GameList from '../../components/Game_List/Game_List';
import { describe, it, expect, vi} from 'vitest';

const games = [
  { game_id: 1, game_name: "Partida 1" },
  { game_id: 2, game_name: "Partida 2" },
  { game_id: 3, game_name: "Partida 31" },
];

describe("GameList Component", () => {

  it("Renderiza 'No se encontraron partidas' si no hay partidas existentes.", () => {
    render(<GameList games={[]} handleJoin={vi.fn()} filter="" />);

    expect(screen.getByText("No se encontraron partidas.")).toBeInTheDocument();
  });

  it("Lista todas las partidas si no hay filtro ingresado", () => {
    render(<GameList games={games} handleJoin={vi.fn()} filter="" />);

    expect(screen.getByText("Partida 1")).toBeInTheDocument();
    expect(screen.getByText("Partida 2")).toBeInTheDocument();
    expect(screen.getByText("Partida 31")).toBeInTheDocument();
  });

  it("Lista todas las partidas que coinciden con filtro", () => {

    render(<GameList games={games} handleJoin={vi.fn()} filter="1" />);

    expect(screen.getByText("Partida 1")).toBeInTheDocument();
    expect(screen.getByText("Partida 31")).toBeInTheDocument();
    expect(screen.queryByText("Partida 2")).not.toBeInTheDocument(); // B no debería estar
  });


  it("Renderiza 'No se encontaron partidas' cuando no coincide el filtro", () => {

    render(<GameList games={games} handleJoin={vi.fn()} filter="4" />);
    expect(screen.getByText("No se encontraron partidas.")).toBeInTheDocument();
  });
});
