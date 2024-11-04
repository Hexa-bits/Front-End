import "./Chat.css";
import Form from "../../../components/Form/Form.jsx";
import Button from "../../Button/Button.jsx";
import React, { useState } from "react";
import WSMessages from "../../../services/WS/Chat/WSMessages.js";

function Chat({ ws, playerId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // Almacena todos los mensajes en un array

    // Función para recibir mensajes del WebSocket
    const handleIncomingMessage = (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
    };

    // Inicializa WSMessages y obtiene la función para enviar mensajes
    const { sendMessage: sendWSMessage } = WSMessages({ ws, onMessageReceived: handleIncomingMessage });

    // Enviar mensaje al WebSocket y agregarlo a la lista
    const sendMessage = () => {
        if (!message) return;
        sendWSMessage(playerId, message);
        setMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            sendMessage();
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
                <Form
                    id="form-chat"
                    placeholder="Ingrese un mensaje"
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    onClick={sendMessage}
                    className="btn-send"
                    label={<img src="../../../../assets/icons/send-.svg" alt="send icon" />}
                />
            </div>
        </div>
    );
}

export default Chat;
