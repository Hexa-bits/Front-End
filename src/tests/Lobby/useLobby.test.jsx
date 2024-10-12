import { describe, it, vi, expect, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import useLobby from "../../services/Lobby/useLobby";

// Mock para useNavigate de React Router
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

const gameId = "123";
const LOBBY_URL = "/home/lobby?game_id=123";

describe("useLobby hook", () => {
  let mockFetch;
  let mockWs;

  beforeEach(() => {
    // Mock de fetch
    mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name_players: ["Jugador 1", "Jugador 2"],
            game_name: "Partida Test",
            max_players: 4,
          }),
      })
    );
    // Mock de WebSocket
    mockWs = {
      onmessage: null,
      onerror: null,
    };
    global.fetch = mockFetch;

    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Se obtiene la información del lobby correctamente al montar el hook", async () => {
    const { result } = renderHook(() => useLobby(mockWs, gameId));

    // Espera que el hook actualice el estado
    waitFor(() => {
      // Verifica que se haya llamado a fetch con el URL correcto
      expect(fetchMock).toHaveBeenCalledWith(LOBBY_URL, { method: "GET" });

      expect(result.current.players).toEqual(["player1", "player2"]);
      expect(result.current.gameName).toBe("Test Game");
      expect(result.current.maxPlayers).toBe(4);
      expect(result.current.activeGame).toBe(false);
      expect(result.current.cancelGame).toBe(false);
    });
  });

  it('Correcto manejo de mensaje de WebSocket "Se unió/abandonó jugador en lobby"', async () => {
    const { result } = renderHook(() => useLobby(mockWs, gameId));
    // Simula el mensaje WebSocket
    act(() => {
      mockWs.onmessage({ data: "Se unió/abandonó jugador en lobby" });
    });
    waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });

  it('Correcto manejo de mensaje de WebSocket "La partida inició"', () => {
    const { result } = renderHook(() => useLobby(mockWs, "game123"));
    act(() => {
      mockWs.onmessage({ data: "La partida inició" });
    });
    expect(result.current.activeGame).toBe(true);
  });

  it('Correcto manejo de mensaje de WebSocket "La partida se canceló"', () => {
    const { result } = renderHook(() => useLobby(mockWs, "game123"));
    act(() => {
      mockWs.onmessage({ data: "La partida se canceló" });
    });
    expect(result.current.cancelGame).toBe(true);
  });
});
