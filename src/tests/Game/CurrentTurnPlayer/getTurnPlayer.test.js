import getTurnPlayer from "../../../services/Game/TurnPlayer/getTurnPlayer.js";
import { GET_TURN_PLAYER_URL } from "../../../utils/Constants.js";

describe("getTurnPlayer", () => {
  const mockGameId = "mockGameId";
  const mockUrl = `${GET_TURN_PLAYER_URL}${mockGameId}`; // Construye la URL completa
  const mockResponseData = {
    id_player: "mockPlayerId",
    name_player: "Player1",
  };

  // Definir la variable consoleErrorSpy aquí para que esté disponible globalmente
  let consoleErrorSpy;

  beforeEach(() => {
    // Inicializar el espía en cada test
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Debe hacer fetch para pedir por GET el playerId y namePlayer", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await getTurnPlayer(mockGameId);
    expect(result).toEqual({
      playerId: "mockPlayerId",
      namePlayer: "Player1",
    });
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("Gestionar errores de conexión de red.", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getTurnPlayer(mockGameId);
    expect(result).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error fetching player turn:"),
      expect.any(Error)
    );
  });

  test("Gestionar errores de fetch.", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    const result = await getTurnPlayer(mockGameId);

    expect(result).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error fetching player turn:"),
      expect.any(Error)
    );
  });
});
