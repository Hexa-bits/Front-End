import React, { useEffect, useState } from "react";

import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { LoginHelpText } from "../../../../utils/Constants.js";
import { useLogin } from "../../../../services/Login/useLogin.js";
import './Login.css';

function Login() {
    const { playerName, handleChange, handleInput, error } = useLogin();
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsTitleVisible(true), 500); 
        setTimeout(() => setIsFormVisible(true), 2000); 
    }, []);

    return (
        <div className="login-container">
            <h1 className={`login-title ${isTitleVisible ? "visible" : ""}`}>
                EL SWITCHER
            </h1>
            {isFormVisible && (
                <div className="card">
                    <Form
                        label="INGRESA UN NOMBRE"
                        type="text"
                        placeholder="Ingresar nombre de usuario"
                        id="inputPlayername"
                        onChange={handleChange}
                        value={playerName}
                        icon="/assets/icons/usuario.png"
                        error={error}
                    />
                    <Button className="btn btn-secondary" label="INGRESAR" onClick={handleInput} />
                </div>
            )}
        </div>
    );
}

export default Login;