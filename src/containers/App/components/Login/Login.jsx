import React from "react";
import { useLogin } from '../../../../hooks/Login/useLogin.js';
import Button from '../../../../components/Button/Button.jsx';
import Form from '../../../../components/Form/Form.jsx';
import { LoginHelpText } from '../../../../utils/Constants.js';
import './Login.css';

function Login () {
    const { username, handleChange, handleInput } = useLogin();  // Hook para manejar lógica
    return ( 
        <div className="login-container">
            <h1 className="login-title"> El Switcher </h1>
            <div className="card login-card">
                <Form
                    label="Registro de Usuario"
                    type="text"
                    placeholder="Ingresar nombre de usuario"
                    helpText={LoginHelpText}
                    id="inputUsername"
                    onChange={handleChange}
                    value={username}
                /> 
                <Button label="Ingresar" onClick={handleInput}/>
            </div>
        </div>
    );
}

export default Login;