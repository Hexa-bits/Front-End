import { renderHook, waitFor } from "@testing-library/react"; // Asegúrate de importar waitFor
import { describe, it, expect, afterEach, vi } from "vitest";
import renewFigCards from "../../../services/Game/Cards/renewFigCards";

// Mock de la función fetch
global.fetch = vi.fn();

describe("renewFigCards", () => {
  const playerId = "12345";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Inicializa con valores por defecto", () => {
    const { result } = renderHook(() => renewFigCards(playerId));
    expect(result.current.figs_ids).toEqual([]);
  });

  it("Fetch exitoso", async () => {
    const mockResponse = { id_fig_card: ["fig1", "fig2"] };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result } = renderHook(() => renewFigCards(playerId));

    // Espera a que figs_ids se actualice
    await waitFor(() =>
      expect(result.current.figs_ids).toEqual(mockResponse.id_fig_card)
    );
  });

  it("Fetch fallido", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => renewFigCards(playerId));

    // Espera a que el efecto se ejecute
    await waitFor(() => expect(result.current.figs_ids).toEqual([])); // Verifica que el estado no cambie
  });
});
