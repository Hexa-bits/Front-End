import "./Chat.css";
import Form from "../../../components/Form/Form.jsx";

function Chat() {
    return (
        <div className="chat__container">
            
            <div className="chat__msj">

            </div>

            <div className="chat__entries">
                <Form
                placeholder={"Ingrese un mensaje"}
                />
                <img src="../../../../assets/icons/send.svg"/>
            </div>
        </div>
    );
}

export default Chat;