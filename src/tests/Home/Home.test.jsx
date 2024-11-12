import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../containers/App/components/Home/Home.jsx";
import useGames from "../../services/Home/useGames.js";
import JoinGame from "../../services/Home/JoinGame.js";
import { expect } from "vitest";

// Mockea los hooks y funciones que se usan en el componente
vi.mock("../../services/Home/useGames.js");
vi.mock("../../services/Home/JoinGame.js");

// Configura los mocks para los hooks
beforeEach(() => {
  useGames.mockReturnValue({ games: [] });
  JoinGame.mockReturnValue({ joinGame: vi.fn() });
});

// Prueba de renderización
describe("Home", () => {
  it("Debería renderizar el nombre de usuario.", () => {
    // Configura el sessionStorage para la prueba
    sessionStorage.setItem("player_id", "1");
    sessionStorage.setItem("player_name", "TestUser");

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el nombre de usuario se renderice
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });

  it("Debería renderizar el botón Crear Partida", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el botón "Crear Partida" se renderice
    expect(
      screen.getByRole("button", { name: /CREAR PARTIDA/i })
    ).toBeInTheDocument();
  });

  it("Renderiza el label del checkbox", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const checkbox = screen.getByLabelText(
      "Búsqueda por cantidad máxima de jugadores"
    );
    expect(checkbox).toBeInTheDocument();
  });

  it("Cambia el filtro segun el estado del checckbox", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const checkbox = getByLabelText(
      "Búsqueda por cantidad máxima de jugadores"
    );
    const input = getByPlaceholderText("Buscar por nombre");

    // Cambia el estado del checkbox
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Verifica que el placeholder cambie
    expect(input.placeholder).toBe("Buscar por cantidad máxima de jugadores");

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    expect(input.placeholder).toBe("Buscar por nombre");
  });

  it("Renderiza mis partidas comenzadas en GameList", () => {
    // Configura juegos de prueba
    const mockGames = [
      { game_id: 1, game_name: "Juego 1", current_players: 1, max_players: 4, isPrivate : true, started: true },
      { game_id: 2, game_name: "Juego 2", current_players: 0, max_players: 4, isPrivate : false, started: true },
    ];
    useGames.mockReturnValue({ games: mockGames });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que se rendericen los nombres de los juegos
    expect(screen.getByText(/juego 1/i)).toBeInTheDocument();
    expect(screen.getByText(/juego 2/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/4/i)).toBeInTheDocument();
    expect(screen.getByText(/0\/4/i)).toBeInTheDocument();
    expect(screen.getByText("Mis partidas comenzadas")).toBeInTheDocument();
    expect(screen.queryByText("Otras partidas")).not.toBeInTheDocument();
  });
  
  it("Renderiza las otras partidas disponibles en GameList", () => {
    // Configura juegos de prueba
    const mockGames = [
      { game_id: 1, game_name: "Juego 1", current_players: 1, max_players: 4, isPrivate : true, started: false },
      { game_id: 2, game_name: "Juego 2", current_players: 0, max_players: 4, isPrivate : false, started: false },
    ];
    useGames.mockReturnValue({ games: mockGames });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que se rendericen los nombres de los juegos
    expect(screen.getByText(/juego 1/i)).toBeInTheDocument();
    expect(screen.getByText(/juego 2/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/4/i)).toBeInTheDocument();
    expect(screen.getByText(/0\/4/i)).toBeInTheDocument();
    expect(screen.queryByText("Mis partidas comenzadas")).not.toBeInTheDocument();
    expect(screen.getByText("Otras partidas")).toBeInTheDocument();
  });

  it("Renderiza todas las partidas disponibles en GameList", () => {
    // Configura juegos de prueba
    const mockGames = [
      { game_id: 1, game_name: "Juego 1", current_players: 1, max_players: 4, isPrivate : true, started: true },
      { game_id: 2, game_name: "Juego 2", current_players: 0, max_players: 4, isPrivate : false, started: false },
    ];
    useGames.mockReturnValue({ games: mockGames });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que se rendericen los nombres de los juegos
    expect(screen.getByText(/juego 1/i)).toBeInTheDocument();
    expect(screen.getByText(/juego 2/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/4/i)).toBeInTheDocument();
    expect(screen.getByText(/0\/4/i)).toBeInTheDocument();
    expect(screen.getByText("Mis partidas comenzadas")).toBeInTheDocument();
    expect(screen.getByText("Otras partidas")).toBeInTheDocument();
  });

});
