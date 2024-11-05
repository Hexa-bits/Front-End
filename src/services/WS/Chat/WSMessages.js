import { useEffect } from 'react';

function WSMessages({ ws, onMessageReceived }) {
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "message") { 
                    onMessageReceived(data.data); 
                }
            } catch (error) {
                console.error("Error al parsear el mensaje:", error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage); // Limpieza del listener
        };
    }, [ws, onMessageReceived]);

    const sendMessage = (playerId, msg) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const message = JSON.stringify({
            player_id: playerId,
            msg: msg
        });
        ws.send(message);
    };

    return { sendMessage };
}

export default WSMessages;
