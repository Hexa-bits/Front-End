import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../containers/App/components/Home/Home.jsx";
import useGames from "../../services/Home/useGames.js";
import JoinGame from "../../services/Home/JoinGame.js";

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
  it("Debería renderizar el nombre de usuario y el ID del jugador.", () => {
    // Configura el sessionStorage para la prueba
    sessionStorage.setItem("player_id", "1");
    sessionStorage.setItem("player_name", "TestUser");

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el nombre de usuario y el ID de usuario se rendericen
    expect(screen.getByText(/usuario: testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/ID: 1/i)).toBeInTheDocument();
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

    // Cambia el estado del checkbox de nuevo
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    // Verifica que el placeholder del input vuelva a cambiar
    expect(input.placeholder).toBe("Buscar por nombre");
  });

  it("Debería renderizar los juegos disponibles en GameList", () => {
    // Configura juegos de prueba
    const mockGames = [
      { game_id: 1, game_name: "Juego 1", current_players: 1, max_players: 4 },
      { game_id: 2, game_name: "Juego 2", current_players: 0, max_players: 4 },
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
  });
});
