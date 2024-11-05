import "./Chat.css";
import { useState, useEffect, useRef } from "react";
import WSMessages from "../../../services/WS/Chat/WSMessages";
import Button from "../../Button/Button";

function Chat({ ws, playerId }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    
    // Crear una referencia para el final de la lista de mensajes
    const messagesEndRef = useRef(null);

    const { sendMessage } = WSMessages({
        ws,
        onMessageReceived: (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        }
    });

    const handleSendMessage = (msg) => {
        if (msg.trim()) {
            sendMessage(playerId, msg);
            setInput("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage(input);
        }
    };

    // Usar un efecto para hacer scroll hasta el final cuando se reciba un nuevo mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chat__container">
            <div className="chat__msj">
                <ul id="messages">
                    {messages.map((msg, index) => (
                        <li key={index}><strong>{msg.player_name}</strong> <br/> {msg.msg}</li>
                    ))}
                    {/* Este elemento vacío actúa como el punto de referencia para el scroll */}
                    <div ref={messagesEndRef} />
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
