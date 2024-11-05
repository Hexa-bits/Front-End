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
    readyState: WebSocket.OPEN, // El WebSocket está abierto
};

global.WebSocket = vi.fn(() => mockWebSocket);

vi.mock('../../../services/WS/Chat/WSMessages', () => ({
    __esModule: true, // Para indicar que es un módulo ES
    default: ({ ws, onMessageReceived }) => {
        useEffect(() => {
            if (!ws) return;

            const handleMessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'message') {
                        onMessageReceived(data.data);
                    }
                } catch (error) {
                    console.error('Error al parsear el mensaje:', error);
                }
            };

            ws.addEventListener('message', handleMessage);

            return () => {
                ws.removeEventListener('message', handleMessage); // Limpieza del listener
            };
        }, [ws, onMessageReceived]);

        return { sendMessage: mockSendMessage };
    },
}));

describe('Chat Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    it('Should render received messages correctly', async () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        // Esperar a que el mensaje se renderice
        const messageItem = await waitFor(() => screen.getByText('Hola'));

        // Verificar que el mensaje aparezca en el DOM
        expect(messageItem).toBeInTheDocument();
        expect(messageItem).toHaveTextContent('Jugador 1');
    });

    it('Should send a message when the send button is clicked.', () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        // Ingresar un mensaje en el input
        const input = screen.getByPlaceholderText('Escribe un mensaje...');
        fireEvent.change(input, { target: { value: 'Mensaje de prueba' } });

        // Hacer clic en el botón de enviar
        const sendButton = screen.getByRole('button');
        fireEvent.click(sendButton);

        // Verificar que sendMessage haya sido llamado con los argumentos correctos
        expect(mockSendMessage).toHaveBeenCalledWith('123', 'Mensaje de prueba');
        expect(input.value).toBe('');
    });

    it('Should send a message when “Enter” is pressed."', () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        // Ingresar un mensaje en el input
        const input = screen.getByPlaceholderText('Escribe un mensaje...');
        fireEvent.change(input, { target: { value: 'Mensaje de prueba' } });

        // Simular el evento 'Enter' en el input
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Verificar que sendMessage haya sido llamado con los argumentos correctos
        expect(mockSendMessage).toHaveBeenCalledWith('123', 'Mensaje de prueba');
        expect(input.value).toBe('');
    });
});