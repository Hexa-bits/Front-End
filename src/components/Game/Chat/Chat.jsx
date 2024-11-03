import "./Chat.css";
import Form from "../../../components/Form/Form.jsx";

function Chat() {
    const game_name = sessionStorage.getItem("game_name");
    return (
        <div className="chat__container">
            <div className="chat__title">
                Chat de {game_name}
            </div>
            
            <div className="chat__msj">

            </div>

            <div className="chat__entries">
                <Form
                    placeholder={"Ingrese un mensaje"}/>
            </div>
        </div>
    );
}

export default Chat;