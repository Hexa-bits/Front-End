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

vi.mock('../../../services/WS/Chat/WSMessages', () => ({
    __esModule: true,
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
                ws.removeEventListener('message', handleMessage);
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

        const messageItem = await waitFor(() => screen.getByText('Hola'));

        expect(messageItem).toBeInTheDocument();
        expect(messageItem).toHaveTextContent('Jugador 1');
    });

    it('Should send a message when the send button is clicked.', () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        const input = screen.getByPlaceholderText('Escribe un mensaje...');
        fireEvent.change(input, { target: { value: 'Mensaje de prueba' } });

        const sendButton = screen.getByRole('button');
        fireEvent.click(sendButton);

        expect(mockSendMessage).toHaveBeenCalledWith('123', 'Mensaje de prueba');
        expect(input.value).toBe('');
    });

    it('Should send a message when “Enter” is pressed."', () => {
        render(<Chat ws={mockWebSocket} playerId="123" />);

        const input = screen.getByPlaceholderText('Escribe un mensaje...');
        fireEvent.change(input, { target: { value: 'Mensaje de prueba' } });

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockSendMessage).toHaveBeenCalledWith('123', 'Mensaje de prueba');
        expect(input.value).toBe('');
    });
});