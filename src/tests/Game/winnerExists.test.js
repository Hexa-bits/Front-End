import { describe, it, vi, expect, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import WinnerExists from "../../hooks/Game/winnerExists";

const gameId = "123";
const GET_WINNER_URL = "/game/winner?game_id=123";

describe("WinnerExists hook", () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name_player: "Jugador 1",
          }),
      })
    );

    global.fetch = mockFetch;

    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Initializes with default values", () => {
    const { result } = renderHook(() => WinnerExists(gameId));
    expect(result.current.winnerName).toBe(null);
  });

  it("fetches winner name correctly", async () => {
    const { result } = renderHook(() => WinnerExists(gameId));
    const { getWinner } = result.current;
    await getWinner();
    waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(GET_WINNER_URL + gameId, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      expect(result.current.winnerName).toBe("Jugador 1");
    });
  });

  it("Handles fetch error gracefully", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    const { result } = renderHook(() => WinnerExists(gameId));
    const { getWinner } = result.current;
    await getWinner();

    waitFor(() => {
      expect(result.current.winnerName).toBe(null);
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching winner:",
        expect.any(Error)
      );
    });
  });
});
