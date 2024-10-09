import { renderHook, act } from '@testing-library/react';
import WsHomeService from '../../services/WsHomeService';


describe('WsHomeService', () => {
    const url = 'ws://localhost:1234';
    let mockWebSocket;

    beforeEach(() => {
        mockWebSocket = {
            send: vi.fn(),
            close: vi.fn(),
            onopen: null,
            onclose: null,
            onmessage: null,
            onerror: null,
        };

        // Mockear el WebSocket global
        global.WebSocket = vi.fn(() => mockWebSocket);
    });

    it('Debería abrir el WebSocket y permitir enviar mensajes', async () => {
        const { result } = renderHook(() => WsHomeService(url));

        await act(async () => {
            mockWebSocket.onopen(); 
        });

        expect(result.current.ws).toBe(mockWebSocket);
        
        const message = 'Hola Mundo';
        act(() => {
            result.current.sendMessage(message);
        });

        expect(mockWebSocket.send).toHaveBeenCalledWith(message);
    });

    it('Debería manejar el cierre del WebSocket', async () => {
        const { result } = renderHook(() => WsHomeService(url));

        await act(async () => {
            mockWebSocket.onopen();
        });

        await act(async () => {
            mockWebSocket.onclose();
        });

        expect(mockWebSocket.close).toHaveBeenCalled();
    });

    it('No debería enviar mensajes si el WebSocket no está abierto', () => {
        const { result } = renderHook(() => WsHomeService(url));

        const message = 'Hola Mundo';
        act(() => {
            result.current.sendMessage(message);
        });

        expect(mockWebSocket.send).not.toHaveBeenCalled();
    });

    it('Debería almacenar mensajes recibidos', async () => {
        const { result } = renderHook(() => WsHomeService(url));

        await act(async () => {
            mockWebSocket.onopen();
        });

        const message = 'Mensaje de prueba';
        await act(async () => {
            mockWebSocket.onmessage({ data: message });
        });

        expect(result.current.messages).toContain(message);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
});
