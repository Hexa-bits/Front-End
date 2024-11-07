import { vi, describe, it, expect } from "vitest";
import {
  createWsGameInstance,
  closeWsGameInstance,
  sendMessage,
  getWsGameInstance,
} from "../../services/WS/WsGameService";

// Mocks WebSocket
vi.stubGlobal(
  "WebSocket",
  class {
    constructor(url) {
      this.url = url;
      this.readyState = 1; // Simula que el WebSocket está abierto
      this.onopen = vi.fn();
      this.onclose = vi.fn();
      this.onmessage = vi.fn();
      this.onerror = vi.fn();
      this.close = vi.fn(); // Mock  de la función close()
      this.send = vi.fn();
    }
  }
);

describe("createWsGameInstance", () => {
  it("debería crear una nueva instancia de WebSocket si no existe", () => {
    const url = "ws://ejemplo.com";
    const ws = createWsGameInstance(url);

    // Comprobamos que WebSocket fue creado
    expect(ws).toBeInstanceOf(WebSocket);
    expect(ws.url).toBe(url); // Verificamos que el WebSocket tiene el URL correcto
  });

  describe("sendMessage", () => {
    const ws = new WebSocket("ws://ejemplo.com");
    global.ws = ws;
    // it("debería enviar el mensaje cuando el WebSocket está abierto", () => {
    //   const message = "WS FUNCIONA";
    //   expect(global.ws.readyState).toBe(1);
    //   // Llamamos a la función sendMessage con el mensaje
    //   sendMessage(message);

    //   // Verificamos que `ws.send` haya sido llamado con el mensaje correcto
    //   expect(global.ws.send).toHaveBeenCalledWith(message);
    // });

    it("debería loguear un error si el WebSocket no está abierto", () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      ws.readyState = WebSocket.CLOSED;

      const message = "Hola, Mundo";
      sendMessage(message);

      // Verificamos que `console.error` haya sido llamado con el mensaje adecuado
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "No se puede enviar el mensaje, Game WebSocket no está abierto."
      );
    });
  });

  //no la mockeo pq todavia no la usamos entonces quiero preguntar bien como funciona.

  describe("closeWsGameInstance", () => {
    it("debería cambiar el `readyState` de WebSocket a CERRADO (3) después de cerrarlo", () => {
      const ws = new WebSocket("ws://ejemplo.com");
      global.ws = ws;

      // Aseguramos que el WebSocket está abierto
      expect(global.ws.readyState).toBe(1); // 1 = WebSocket OPEN

      // Llamamos a la función que debería cerrar el WebSocket
      closeWsGameInstance();

      setTimeout(() => {
        expect(global.ws.readyState).toBe(3); // 3 = WebSocket CLOSED
      }, 10); // Como el ws tarda en cerrarse, espero
    });
  });
  describe("getWsGameInstance", () => {
    // const game_id = "1234";
    const url = "ws://ejemplo.com"; // URL esperada para el WebSocket. Si se llega a necesitar un gameid, el createwsgameinstance se va a encargar de eso

    beforeEach(() => {
      global.ws = null; // Aseguramos que `ws` está vacío antes de cada test
      vi.clearAllMocks(); // Limpiar mocks
    });

    it("debería crear una nueva instancia de WebSocket si no existe", () => {
      // Llamamos a getWsGameInstance cuando `ws` no está definido
      const wsInstance = getWsGameInstance();

      expect(wsInstance).toBeInstanceOf(WebSocket);
      expect(wsInstance.url).toBe(url); // Verificamos que la URL sea la correcta
    });

    it("debería devolver la instancia de WebSocket existente si ya está definida", () => {
      // Asignamos previamente una instancia de `ws`
      global.ws = new WebSocket(url);

      // Llamamos a `getWsGameInstance`
      const wsInstance = getWsGameInstance();

      // Verificamos que `getWsGameInstance` devuelva la misma instancia
      expect(wsInstance.url).toBe(global.ws.url); // las URLs deben ser iguales
      expect(wsInstance.readyState).toBe(global.ws.readyState); //el ws debe estar abierto
    });
  });
});
