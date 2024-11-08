import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import { describe, it, expect, afterEach, vi } from "vitest";
import postPlayer from "../../../services/Game/TurnPlayer/cancelMov";
import { CANCEL_MOV_URL } from "../../../utils/Constants";

describe("postPlayer", () => {
  const player_id = "123";
  const game_id = "456";
  const url = CANCEL_MOV_URL;

  afterEach(() => {
    fetchMock.restore();
    vi.restoreAllMocks(); // Limpia los mocks de Vitest
  });

  it("Deberia hacer un put a CANCEL_MOV_URL", async () => {
    fetchMock.put(url, 200);

    await postPlayer(player_id, game_id);

    expect(fetchMock.called(url)).toBe(true);
    expect(fetchMock.lastCall(url)[1].body).toEqual(
      JSON.stringify({ player_id, game_id })
    );
  });

  it("Deberia manejar el error 404", async () => {
    global.alert = vi.fn(); // Mock de alert
    fetchMock.put(url, 404);

    await postPlayer(player_id, game_id);

    expect(global.alert).toHaveBeenCalledWith(
      "No quedan movimientos por deshacer"
    );
  });

  it("Deberia manejar el error 400", async () => {
    global.alert = vi.fn(); // Mock de alert
    fetchMock.put(url, 400);

    await postPlayer(player_id, game_id);

    expect(global.alert).toHaveBeenCalledWith(
      "No quedan movimientos por deshacer"
    );
  });

  it("debe dar error cuando recibe una rta no ok", async () => {
    fetchMock.put(url, 500); // Simula un error del servidor

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await postPlayer(player_id, game_id);

    expect(consoleError).toHaveBeenCalled();
  });

  it("Deberia imprimir un mje de exito cuando se descarte la carta bien", async () => {
    fetchMock.put(url, 200);
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    await postPlayer(player_id, game_id);

    expect(consoleLog).toHaveBeenCalledWith("mov descartado con éxito");
  });
});
