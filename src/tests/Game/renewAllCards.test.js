import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import renewAllCards from "../../hooks/Game/Cards/renewAllCards.js";

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
        json: () => Promise.resolve({ id_mov_card: [1, 2, 3] }),
      })
    );
    mockFigsFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id_fig_card: [4, 5, 6] }),
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
    expect(result.current.movs_ids).toEqual([]);
    expect(result.current.figs_ids).toEqual([]);
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
      expect(result.current.movs_ids).toEqual([1, 2, 3]);
      expect(result.current.figs_ids).toEqual([4, 5, 6]);
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
      expect(result.current.movs_ids).toBe(null);
      expect(result.current.figs_ids).toBe(null);
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
