import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import renewMovCards from "../../../services/Game/Cards/renewMovCards";

// Mock de la función fetch
global.fetch = vi.fn();

describe("renewMovCards", () => {
  const playerId = "12345";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Inicializa con valores por defecto", () => {
    const { result } = renderHook(() => renewMovCards(playerId));
    expect(result.current.mov_cards).toEqual([]);
  });

  it("Fetch exitoso", async () => {
    const mockResponse = { mov_cards: ["move1", "move2"] };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result } = renderHook(() => renewMovCards(playerId));

    // Espera a que mov_cards se actualice
    await waitFor(() =>
      expect(result.current.mov_cards).toEqual(mockResponse.mov_cards)
    );
  });

  it("Fetch fallido", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => renewMovCards(playerId));

    // Espera a que el efecto se ejecute
    await waitFor(() => expect(result.current.mov_cards).toEqual([])); // Verifica que el estado no cambie
  });
});
