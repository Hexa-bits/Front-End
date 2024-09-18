import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { useState } from "react";
import './Login.css';

function Login () {
    const port = 8000;
    const helpText = "Debe tener entre 1 y 10 caracteres.";

    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value);
    };
    
    const checkInput = (input) => {
        return input.length > 0 && input.length <= 10;
    }


    const handleClick = async () => {
        
        if (checkInput(username)) {
            const url = `http://localhost:${port}/login`;
            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })  
                });
                console.log("Usuario creado exitosamente");
            }
            catch (error) {
                alert("Error al crear usuario" + error.message);
            }
        }
        else {
            alert("Nombre " + helpText);
        }
    };

    return ( 
        <div className="login-container">
            <h1 className="login-title"> El Switcher </h1>
            <div className="card login-card">
                <Form
                    label="Registro de Usuario"
                    type="text"
                    placeholder="Ingresar nombre de usuario"
                    helpText={helpText}
                    id="inputUsername"
                    onChange={handleChange}
                /> 
                <Button label="Ingresar" onClick={handleClick}/>
            </div>
        </div>
    );
}

export default Login;