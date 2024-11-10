import { useEffect } from 'react';

function WSChatHandler({ ws, onMessageReceived, onLogReceived }) {
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            let messageData = event.data.trim();

            messageData = messageData.replace(/'/g, '"');

            try {
                const data = JSON.parse(messageData);

                if (data.type === "message" && data.data) {
                    onMessageReceived(data.data);
                } else if (data.type === "log" && data.data && data.data.player_name && data.data.event) {
                    onLogReceived(data.data);
                }
            } catch (error) {
                console.error("Error al parsear el mensaje JSON:", error, "Mensaje:", messageData);
            }
        };
        
        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, onMessageReceived, onLogReceived]);

    const sendMessage = (playerId, msg) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const message = JSON.stringify({
            type: "message",
            player_id: playerId,
            msg: msg
        });
        ws.send(message);
    };

    return { sendMessage };
}

export default WSChatHandler;
