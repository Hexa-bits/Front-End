import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../containers/App/components/Home/Home.jsx";
import useGames from "../../services/Home/useGames.js";
import JoinGame from "../../utils/logics/Home/JoinGame.js";

// Mockea los hooks y funciones que se usan en el componente
vi.mock("../../services/Home/useGames.js");
vi.mock("../../utils/logics/Home/JoinGame.js");

// Configura los mocks para los hooks
beforeEach(() => {
  useGames.mockReturnValue({ games: [] });
  JoinGame.mockReturnValue({ joinGame: vi.fn() });
});

// Prueba de renderización
describe("Home", () => {
  it("Debería renderizar el nombre de usuario y el ID del jugador.", () => {
    // Configura el localStorage para la prueba
    localStorage.setItem("id_user", "1");
    localStorage.setItem("username", "TestUser");

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el nombre de usuario y el ID de usuario se rendericen
    expect(screen.getByText(/usuario: testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/id_usuario: 1/i)).toBeInTheDocument();
  });

  it("Debería renderizar el botón Crear Partida", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el botón "Crear Partida" se renderice
    expect(
      screen.getByRole("button", { name: /crear partida/i })
    ).toBeInTheDocument();
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
