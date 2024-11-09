import { useEffect } from 'react';

function WSLogs({ ws, onMessageReceived }) {
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const log = JSON.parse(event.data);
                console.log("Mensaje recibido:", log);
                if (log.type === "log" && log.data && log.data.player_name && log.data.event) { 
                    onMessageReceived(log.data);
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

export default WSLogs;
