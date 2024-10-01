import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 

import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import '../../../../utils/Constants.js'
import { LoginHelpText, LOGIN_URL } from "../../../../utils/Constants.js";
import './Login.css';


function Login () {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');  

    useEffect(() => {
       const savedUserName = localStorage.getItem('username');
        if (savedUserName) {
            setUsername(savedUserName);
        }
    }, []);    
    
    const handleChange = (e) => { setUsername(e.target.value); };
    const checkInput = (input) => { return input.length > 0 && input.length <= 10; }
    
    async function register () {
        try {            
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })  
            });
            
            if (!response.ok) {
                throw new Error("Error al enviar solicitud 'crear usuario'. ");
            }

            const data = await response.json();
            const Id = data.id;

            alert(`Usuario ${username} creado exitosamente con Id: ${Id}.`);
            localStorage.setItem('username', username); 
            localStorage.setItem('id_user', Id);
            navigate('/home');
            
        } catch (error) {
            alert("Error al crear usuario. " + error.message);
        }
    }
    
    const handleInput = () => {
        if (checkInput(username)) {
            const savedUserName = localStorage.getItem('username');
            if (username !== savedUserName) {                    
                register();
            } else {
                navigate('/home');
            }
        } else {
            alert("Nombre " + LoginHelpText);
        }
    };

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
