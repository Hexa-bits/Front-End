import { LeaveGame } from "../../services/Lobby/leaveGame";
import { describe, it, vi, expect, beforeAll } from "vitest";
import { GAME_LEAVE_URL, HOME } from "../../utils/Constants";
import { closeWsGameInstance } from "../../services/WS/WsGameService";
import { waitFor } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

// Mock de closeWsGameInstance
vi.mock("../../services/WS/WsGameService", () => ({
  closeWsGameInstance: vi.fn(),
}));

describe("LeaveGame function", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería hacer la llamada para abandonar el juego y navegar", async () => {
    // Mock para sessionStorage y fetch
    const mockNavigate = vi.fn();
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    const mockLocalStorage = {
      getItem: vi.fn((key) => {
        if (key === "player_id") return "456";
        if (key === "game_id") return "789";
        return null;
      }),
      removeItem: vi.fn(),
    };

    Object.defineProperty(global, "sessionStorage", { value: mockLocalStorage });
    global.fetch = mockFetch;

    LeaveGame(mockNavigate);
    await waitFor(() => {
      // Verificaciones
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("player_id");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("game_id");
      expect(mockFetch).toHaveBeenCalledWith(`${GAME_LEAVE_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id: 789, id_user: 456 }),
      });
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("game_id");
      expect(closeWsGameInstance).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(HOME);
    });
  });

  it("debería manejar errores al intentar abandonar el juego", async () => {
    // Mock para sessionStorage y fetch que lanza error
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("Error al abandonar el juego"),
      })
    );
    global.fetch = mockFetch;
    global.alert = vi.fn();

    LeaveGame();
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "No se pudo abandonar el juego. Error al abandonar el juego"
      );
    });
  });
});
