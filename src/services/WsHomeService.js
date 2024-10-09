import { useEffect, useRef, useState } from 'react';

function WsHomeService (url) {
    const ws = useRef(null);
    const [isWsOpen, setIsWsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!ws.current) {
            ws.current = new WebSocket(url);
            
            ws.current.onopen = () => {
                console.log("WebSocket abierto.");
                setIsWsOpen(true);
            };

            ws.current.onclose = () => {
                console.log("WebSocket cerrado.");
                setIsWsOpen(false);
            };

            ws.current.onmessage = (event) => {
                console.log("Mensaje recibido:", event.data);
                setMessages(prevMessages => [...prevMessages, event.data]);
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }

        return () => {
            if (isWsOpen) {
                console.log("Cerrando WebSocket");
                ws.current.close();
            }
        };
    }, [url, isWsOpen]);

    const sendMessage = (message) => {
        if (isWsOpen && ws.current) {
            ws.current.send(message);
        } else {
            console.error("No se puede enviar el mensaje, WebSocket no está abierto.");
        }
    };

    return { ws: ws.current, messages, sendMessage };
};

export default WsHomeService;
