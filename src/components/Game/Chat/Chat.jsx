import "./Chat.css";
import { useState } from "react";
import WSMessages from "../../../services/WS/Chat/WSMessages";
import Button from "../../Button/Button";
import { useEffect } from 'react';

function Chat({ ws, playerId }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            console.log("SIN PARSEO -> ", event.data);
            try {
                const data = JSON.parse(event.data);
                console.log("PARSEADO -> ", data);
                if (data.type === "message") { // Verificamos que el tipo sea "message"
                    setMessages(prevMessages => [...prevMessages, data.data]); // Actualiza los mensajes
                }
            } catch (error) {
                console.error("Error al parsear el mensaje:", error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage); // Limpieza del listener
        };
    }, [ws]); // Dependencia en ws para asegurarnos de que el efecto se ejecute cuando cambie

    const handleSendMessage = (msg) => {
        if (msg.trim()) { // Verifica que el mensaje no esté vacío
            const message = JSON.stringify({
                player_id: playerId,
                msg: msg,
            });
            ws.send(message);
            setInput(""); 
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSendMessage(input);
        }
    };

    return (
        <div className="chat__container">
            <div className="chat__msj">
                <ul id="messages">
                    {messages.map((msg, index) => (
                        <li key={index}><strong>{msg.player_name}</strong>: {msg.msg}</li>
                    ))}
                </ul>
            </div>
            <div className="chat__entries">
                <div className="form__container">
                    <div className="form">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="input"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <Button
                        onClick={() => handleSendMessage(input)}
                        className="btn-send"
                        label={<img src="../../../../assets/icons/send-.svg" alt="send icon" />}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chat;