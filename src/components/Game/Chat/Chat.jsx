import "./Chat.css";
import { useState, useEffect, useRef } from "react";
import WSChatHandler from "../../../services/WS/Chat/WSChatHandler";
import Button from "../../Button/Button";

function Chat({ ws, playerId }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const { sendMessage } = WSChatHandler({
        ws,
        onMessageReceived: (data) => {
            console.log("Mensaje recibido en Chat:", data); // Cuando se recibe un mensaje en Chat
            setMessages((prevMessages) => [...prevMessages, { type: 'message', ...data }]);
        },
        onLogReceived: (log) => {
            console.log("Log recibido en Chat:", log); // Cuando se recibe un log en Chat
            setMessages((prevMessages) => [...prevMessages, { type: 'log', ...log }]);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [messages]);

    return (
        <div className="chat__container">
            <div className="chat__msj">
                <ul id="messages">
                    {messages.map((item, index) => (
                        <li key={index} className={item.type === 'log' ? "log" : "message-item"}>
                            {item.type === 'message' ? (
                                <>
                                    <strong>{item.player_name}</strong> <br/> {item.msg}
                                </>
                            ) : (
                                <>
                                    <strong>{item.player_name}</strong> <br/> {item.event}
                                </>
                            )}
                        </li>
                    ))}
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
