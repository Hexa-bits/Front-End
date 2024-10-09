import { useEffect, useRef, useState } from 'react';

function WsHomeService (url) {
    const ws = useRef(null);
    const [isWsOpen, setIsWsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!ws.current) {
            ws.current = new WebSocket(url);
            
            ws.current.onopen = () => {
                console.log("Home WebSocket abierto.");
                setIsWsOpen(true);
            };

            ws.current.onclose = () => {
                console.log("Home WebSocket cerrado.");
                setIsWsOpen(false);
            };

            ws.current.onmessage = (event) => {
                console.log("Home Ws Mensaje recibido:", event.data);
                setMessages(prevMessages => [...prevMessages, event.data]);
            };

            ws.current.onerror = (error) => {
                console.error('Home WebSocket error:', error);
            };
        }

        return () => {
            if (isWsOpen) {
                console.log("Cerrando Home WebSocket");
                ws.current.close();
            }
        };
    }, [url, isWsOpen]);

    const sendMessage = (message) => {
        if (isWsOpen && ws.current) {
            ws.current.send(message);
        } else {
            console.error("No se puede enviar el mensaje, Home WebSocket no está abierto.");
        }
    };

    return { ws: ws.current, messages, sendMessage };
};

export default WsHomeService;
