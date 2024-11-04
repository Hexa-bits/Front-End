import { useEffect } from 'react';

function WSMessages({ ws, onMessageReceived }) {
    useEffect(() => {
        if (!ws) return;

        // Escucha de mensajes entrantes del WebSocket
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Verificamos que el mensaje tenga el formato correcto
            if (data.type === "message" && data.data) {
                onMessageReceived(data.data);
            }
        };

        return () => {
            ws.onmessage = null; // Limpia la escucha cuando el componente se desmonta
        };
    }, [ws, onMessageReceived]);

    // Función para enviar un mensaje
    const sendMessage = (playerId, msg) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const message = JSON.stringify({
            type: "message",
            data: { player_id: playerId, msg }
        });
        ws.send(message);
    };

    return { sendMessage };
}

export default WSMessages;
