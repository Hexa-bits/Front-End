import React, { useEffect, useState } from "react";

import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { LoginHelpText } from "../../../../utils/Constants.js";
import { useLogin } from "../../../../services/Login/useLogin.js";
import './Login.css';

function Login() {
    const { username, handleChange, handleInput } = useLogin();

    return (
        <div className="login-container">
        <h1 className="login-title"> El Switcher </h1>
        <div className="card">
            <Form
                label="Registro de Usuario"
                type="text"
                placeholder="Ingresar nombre de usuario"
                helpText={LoginHelpText}
                id="inputUsername"
                onChange={handleChange}
                value={username}
            /> 
            <Button class="btn btn-secondary" label="Ingresar" onClick={handleInput}/>
        </div>
    </div>
    );
}

export default Login;
