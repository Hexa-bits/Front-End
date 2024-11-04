import "./Chat.css";
import Form from "../../../components/Form/Form.jsx";
import Button from "../../Button/Button.jsx";
import React, { useState } from "react";

function Chat() {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message) return;
        const li = document.createElement('li');
        li.textContent = message;
        document.getElementById('messages').appendChild(li);
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
                <ul id="messages"></ul>
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
