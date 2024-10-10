import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import renewAllCards from "../../../hooks/Game/Cards/getAllCards";
import { GET_MOVEMENTS_URL, GET_FIGURES_URL } from "../../../utils/Constants";

describe("renewAllCards hook", () => {
  const playerId = 1; // ID del jugador para las pruebas
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería obtener cartas de figuras y movimientos correctamente", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_fig_card: [1, 2, 3] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_mov_card: [4, 5, 6] }),
      });

    const { result } = renderHook(() => renewAllCards(null, playerId));

    // Espera a que se procesen las promesas
    await act(async () => {});

    expect(result.current.figs_ids).toEqual([1, 2, 3]);
    expect(result.current.movs_ids).toEqual([4, 5, 6]);
  });

  it("debería manejar errores al obtener cartas de figuras", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        statusText: "Error en la API",
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_mov_card: [4, 5, 6] }),
      });

    const { result } = renderHook(() => renewAllCards(null, playerId));

    await act(async () => {});

    expect(result.current.figs_ids).toEqual([]); // Esperamos que se maneje el error y no se establezca ninguna figura
    expect(result.current.movs_ids).toEqual([4, 5, 6]);
  });

  it("debería manejar errores al obtener cartas de movimientos", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_fig_card: [1, 2, 3] }),
      })
      .mockResolvedValueOnce({
        ok: false,
        statusText: "Error en la API",
      });

    const { result } = renderHook(() => renewAllCards(null, playerId));

    await act(async () => {});

    expect(result.current.figs_ids).toEqual([1, 2, 3]);
    expect(result.current.movs_ids).toEqual([]); // Esperamos que se maneje el error y no se establezca ningún movimiento
  });
});

describe("renewAllCards hook with WebSocket", () => {
  const playerId = 1; // ID del jugador para las pruebas
  let fetchMock;
  let wsMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;

    // Simulando el WebSocket
    wsMock = {
      onmessage: null,
      onerror: null,
      send: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería actualizar las cartas al recibir un mensaje del WebSocket", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_fig_card: [1, 2, 3] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_mov_card: [4, 5, 6] }),
      });

    const { result } = renderHook(() => renewAllCards(wsMock, playerId));

    // Inicialmente, asegúrate de que no hay cartas
    expect(result.current.figs_ids).toEqual([]);
    expect(result.current.movs_ids).toEqual([]);

    // Simular la recepción de un mensaje del WebSocket
    act(() => {
      wsMock.onmessage({ data: "Terminó turno" });
    });

    // Espera a que se procesen las promesas
    await act(async () => {});

    // Verifica que se hayan llamado las funciones de fetch de nuevo
    expect(fetchMock).toHaveBeenCalledTimes(4); // Llamadas para figuras y movimientos

    // Verifica que el estado se actualice correctamente
    expect(result.current.figs_ids).toEqual([1, 2, 3]);
    expect(result.current.movs_ids).toEqual([4, 5, 6]);
  });

  it("debería manejar errores al recibir un mensaje del WebSocket", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id_fig_card: [1, 2, 3] }),
      })
      .mockResolvedValueOnce({
        ok: false,
        statusText: "Error en la API",
      });

    const { result } = renderHook(() => renewAllCards(wsMock, playerId));

    // Simular la recepción de un mensaje del WebSocket
    act(() => {
      wsMock.onmessage({ data: "Terminó turno" });
    });

    // Espera a que se procesen las promesas
    await act(async () => {});

    // Verifica que se haya llamado a fetch y manejado el error
    expect(fetchMock).toHaveBeenCalledTimes(4);

    // Verifica que el estado se actualice correctamente
    expect(result.current.figs_ids).toEqual([1, 2, 3]);
    expect(result.current.movs_ids).toEqual([]); // Debido al error en movimientos
  });
});
