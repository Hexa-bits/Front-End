import { useEffect } from 'react';

function WSLogs({ ws, onMessageReceived }) {
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const messageData = event.data.trim();
                if (messageData.startsWith("{") || messageData.startsWith("[")) {
                    const log = JSON.parse(messageData);
                    if (log.type === "log" && log.data && log.data.player_name && log.data.event) {
                        onMessageReceived(log.data);
                    }
                } else {
                    console.warn("Mensaje no JSON recibido:", messageData);
                }
            } catch (error) {
                console.error("Error al parsear el mensaje:", error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, onMessageReceived]);

    return {};
}

export default WSLogs;
