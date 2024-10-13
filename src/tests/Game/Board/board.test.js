import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import renewBoard from "../../../services/Game/Board/renewBoard.js";
import { GAME_BOARD_URL } from "../../../utils/Constants.js";

const gameId = 1;
describe("renewBoard", () => {
  let mockFetchBoxCards;

  beforeEach(() => {
    mockFetchBoxCards = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { x: 1, y: 1, color: 1 },
            { x: 2, y: 2, color: 2 },
          ]),
      })
    );
    global.fetch = mockFetchBoxCards;

    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("inicializa los valores", () => {
    const { result } = renderHook(() => renewBoard(gameId));
    expect(result.current.boxCards).toEqual([]);
  });

  it("hace el pedido al boxcards", async () => {
    const { result } = renderHook(() => renewBoard(gameId));

    waitFor(() => {
      expect(mockFetchBoxCards).toHaveBeenCalledWith(GAME_BOARD_URL + gameId, {
        method: "GET",
      });
    });

    waitFor(() => {
      expect(result.current.boxCards).toEqual([
        { x: 1, y: 1, color: 1 },
        { x: 2, y: 2, color: 2 },
      ]);
    });
  });

  it("maneja errores", async () => {
    mockFetchBoxCards.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    const { result } = renderHook(() => renewBoard());

    await waitFor(() => {
      expect(result.current.boxCards).toEqual([]); // Se espera que boxCards siga vacío
      expect(console.error).toHaveBeenCalledWith(
        "Error al obtener las fichas:",
        expect.any(Error)
      );
    });
  });
});