import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import renewAllCards from "../../services/Game/Cards/renewAllCards";

const playerId = 1;
const GET_MOVEMENTS_URL = "/game/movements?player_id=";
const GET_FIGURES_URL = "/game/figures?player_id=";

describe("renewAllCards", () => {
  let mockMovsFetch;
  let mockFigsFetch;

  beforeEach(() => {
    mockMovsFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          mov_cards: [ 
            {"id": 1, "move": 1},
            {"id": 2, "move": 2},
            {"id": 3, "move": 3}
          ] 
        }),
      })
    );
    mockFigsFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          fig_cards: [
            {"id": 4, "fig": 10},
            {"id": 5, "fig": 11},
            {"id": 6, "fig": 12}
          ]}),
      })
    );
    global.fetch = mockMovsFetch;
    global.fetch = mockFigsFetch;

    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Initializes with default values", () => {
    const { result } = renderHook(() => renewAllCards(playerId));
    expect(result.current.mov_cards).toEqual([]);
    expect(result.current.fig_cards).toEqual([]);
  });

  it("fetches cards correctly", async () => {
    const { result } = renderHook(() => renewAllCards(playerId));
    const { fetchFigs, fetchMovs } = result.current;
    await fetchFigs();
    await fetchMovs();

    waitFor(() => {
      expect(mockMovsFetch).toHaveBeenCalledWith(GET_MOVEMENTS_URL + playerId, {
        method: "GET",
      });
      expect(mockFigsFetch).toHaveBeenCalledWith(GET_FIGURES_URL + playerId, {
        method: "GET",
      });
      expect(result.current.mov_cards).toEqual(
        [ 
          {"id": 1, "move": 1},
          {"id": 2, "move": 2},
          {"id": 3, "move": 3}
        ] 
      );
      expect(result.current.fig_cards).toEqual(
        [
          {"id": 4, "fig": 10},
          {"id": 5, "fig": 11},
          {"id": 6, "fig": 12}
        ]
      );
    });
  });

  it("Handles fetch error gracefully", async () => {
    mockMovsFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    mockFigsFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    const { result } = renderHook(() => renewAllCards(playerId));
    const { fetchFigs, fetchMovs } = result.current;

    await fetchFigs();
    await fetchMovs();

    waitFor(() => {
      expect(result.current.mov_cards).toBe(null);
      expect(result.current.fig_cards).toBe(null);
      expect(console.error).toHaveBeenCalledWith(
        "Error al obtener las cartas de movimientos del jugador:",
        expect.any(Error)
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error al obtener las cartas de figuras del jugador:",
        expect.any(Error)
      );
    });
  });
});
