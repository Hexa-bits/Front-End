import { StartGame } from "../../services/Lobby/startGame";
import { describe, it, vi, expect } from "vitest";
import { GAME_START_URL, GAME } from "../../utils/Constants";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("StartGame function", () => {
  vi.spyOn(console, "log").mockImplementation(() => {});

  it("debería hacer la llamada para iniciar el juego y navegar", async () => {
    // Mock para sessionStorage y fetch
    const mockNavigate = vi.fn();
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    const mockLocalStorage = {
      getItem: vi.fn(() => "123"),
    };

    Object.defineProperty(global, "sessionStorage", { value: mockLocalStorage });
    global.fetch = mockFetch;
    const consoleSpy = vi.spyOn(console, "log");

    const startGame = StartGame(mockNavigate);
    await startGame(mockNavigate);

    // Verificaciones
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("game_id");
    expect(mockFetch).toHaveBeenCalledWith(`${GAME_START_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id: 123 }),
    });

    expect(consoleSpy).toHaveBeenCalledWith("Juego 123 iniciado exitosamente");
    expect(mockNavigate).toHaveBeenCalledWith(GAME);

    consoleSpy.mockRestore();
  });

  it("debería manejar errores al intentar iniciar el juego", async () => {
    // Mock para sessionStorage y fetch que lanza error
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("Error al iniciar el juego"),
      })
    );
    global.fetch = mockFetch;

    const consoleSpy = vi.spyOn(console, "log");
    const startGame = StartGame();
    await startGame();

    // Verificaciones
    expect(consoleSpy).toHaveBeenCalledWith(
      "No se pudo iniciar el juego. Error al iniciar el juego"
    );
  });
});
