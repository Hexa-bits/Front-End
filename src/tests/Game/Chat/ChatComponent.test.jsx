import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import Chat from '../../../components/Game/Chat/Chat.jsx';

const mockSendMessage = vi.fn();
const mockAddEventListener = vi.fn((event, callback) => {
    if (event === 'message') {
        setTimeout(() => {
            callback({ data: JSON.stringify({ type: 'message', data: { player_name: 'Jugador 1', msg: 'Hola' } }) });
        }, 100);
    }
});
const mockRemoveEventListener = vi.fn();
const mockWebSocket = {
    send: mockSendMessage,
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
    readyState: WebSocket.OPEN,
};

global.WebSocket = vi.fn(() => mockWebSocket);

vi.mock('../../../services/WS/Chat/WSChatHandler', () => ({
    __esModule: true,
    default: ({ ws, onMessageReceived, onLogReceived }) => {
        useEffect(() => {
            if (!ws) return;

            const handleMessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'message') {
                        onMessageReceived(data.data);
                    } else if (data.type === 'log') {
                        onLogReceived(data.data);
                    }
                } catch (error) {
                    console.error('Error al parsear el mensaje:', error);
                }
            };

            ws.addEventListener('message', handleMessage);

            return () => {
                ws.removeEventListener('message', handleMessage);
            };
        }, [ws, onMessageReceived, onLogReceived]);

        return { sendMessage: mockSendMessage };
    },
}));

describe('Chat Component', () => {
    // Espiar todas las funciones de console
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks(); // Restaurar los mocks después de cada prueba
    });

    it('should log received messages correctly', async () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        // Esperar a que se reciba el mensaje y el log sea emitido
        await waitFor(() => expect(console.log).toHaveBeenCalledWith("Mensaje recibido en Chat:", expect.any(Object)));

        // Verificar que el mensaje que se espera haya sido logueado
        expect(console.log).toHaveBeenCalledWith("Mensaje recibido en Chat:", { player_name: 'Jugador 1', msg: 'Hola' });
    });

    it('Should send a message when “Enter” is pressed', async () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);
        
        const input = screen.getByPlaceholderText("Escribe un mensaje...");
        fireEvent.change(input, { target: { value: "Mensaje de prueba" } });
    
        fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });
    
        await waitFor(() => {
            // Ahora esperamos que se haya llamado a sendMessage con los dos parámetros: playerId y mensaje
            expect(mockSendMessage).toHaveBeenCalledWith("123", "Mensaje de prueba");
        });
    
        // Verificar que el input se haya limpiado
        expect(input.value).toBe('');
    });
    
    it('should log received logs correctly', async () => {
        // Simular la recepción de un log
        render(<Chat ws={mockWebSocket} playerId="123" />);

        // Simular que un log es recibido
        mockAddEventListener.mockImplementationOnce((event, callback) => {
            if (event === 'message') {
                setTimeout(() => {
                    callback({
                        data: JSON.stringify({
                            type: 'log',
                            data: { player_name: 'Jugador 1', event: 'Jugó una carta' }
                        })
                    });
                }, 100);
            }
        });

        await waitFor(() => expect(console.log).toHaveBeenCalledWith("Log recibido en Chat:", expect.any(Object)));

        // Verificar que el log de tipo 'log' se haya emitido correctamente
        expect(console.log).toHaveBeenCalledWith("Log recibido en Chat:", { player_name: 'Jugador 1', event: 'Jugó una carta' });
    });

    it('should handle empty log data gracefully', async () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);
    
        // Simulamos la recepción de un log con datos vacíos
        mockAddEventListener.mockImplementationOnce((event, callback) => {
            if (event === 'message') {
                setTimeout(() => {
                    callback({
                        data: JSON.stringify({
                            type: 'log',
                            data: {}
                        })
                    });
                }, 100);
            }
        });
    
        // Verificamos que el log se haya manejado sin errores, aunque esté vacío
        await waitFor(() => expect(console.log).toHaveBeenCalledWith("Log recibido en Chat:", {}));
    });
 
});
