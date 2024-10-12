import { renderHook } from "@testing-library/react";
import getCurrentTurnPlayer from "../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import getTurnPlayer from "../../../services/Game/TurnPlayer/getTurnPlayer.js";
import { waitFor } from "@testing-library/react";

// Mockear getTurnPlayer
vi.mock("../../../services/Game/TurnPlayer/getTurnPlayer.js");

describe("getCurrentTurnPlayer", () => {
  const gameId = "game123";

  it("Obtiene y establece el jugador actual.", async () => {
    const mockResponse = {
      playerId: "player1",
      namePlayer: "Player One",
    };

    getTurnPlayer.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => getCurrentTurnPlayer(gameId));

    // Esperar a que se complete la actualización del hook
    await waitFor(() => {
      expect(result.current.currentPlayer).toBe("Player One");
      expect(result.current.playerId).toBe("player1");
    });
  });

  it("Maneja errores al obtener datos.", async () => {
    // Simular un error en getTurnPlayer
    getTurnPlayer.mockRejectedValueOnce(new Error("Failed to fetch"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => getCurrentTurnPlayer(gameId));

    // Esperar a que se complete la actualización del hook
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching game data:",
        expect.any(Error)
      );
      expect(result.current.currentPlayer).toBe(null);
      expect(result.current.playerId).toBe(null);
    });

    consoleSpy.mockRestore();
  });

  it("Vuelve a obtener los datos del turno cuando el gameId cambia.", async () => {
    const mockResponse = {
      playerId: "player2",
      namePlayer: "Player Two",
    };

    getTurnPlayer.mockResolvedValueOnce(mockResponse);

    const { result, rerender } = renderHook(
      ({ gameId }) => getCurrentTurnPlayer(gameId),
      { initialProps: { gameId: "game123" } }
    );

    await waitFor(() => {
      expect(result.current.currentPlayer).toBe("Player Two");
      expect(result.current.playerId).toBe("player2");
    });

    // Cambiar el gameId y verificar que se vuelva a obtener el jugador
    getTurnPlayer.mockResolvedValueOnce({
      playerId: "player3",
      namePlayer: "Player Three",
    });

    rerender({ gameId: "game456" });

    await waitFor(() => {
      expect(result.current.currentPlayer).toBe("Player Three");
      expect(result.current.playerId).toBe("player3");
    });
  });
});
