import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Login.css';


function Login () {
    const helpText = "Debe tener entre 1 y 10 caracteres.";
    
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    
    /**
     *  UseEffect is a hook that executes the first time the component is rendered
     *  It is used to get the username from the local storage if it exists
    */
    useEffect(() => {
        const savedUserName = localStorage.getItem('username');
        const savedToken = localStorage.getItem('token');
        if (savedUserName && savedToken) {
            setUsername(savedUserName);
            setToken(savedToken);
        }
    }, []);    
    
    const handleChange = (e) => {
        setUsername(e.target.value);
    };
    
    const checkInput = (input) => {
        return input.length > 0 && input.length <= 10;
    }
    
    const handleClick = async () => {
        
        if (checkInput(username)) {
            const port = 8000;
            const url = `http://localhost:${port}/login`;
            setToken(uuidv4());

            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, token })  
                });
                localStorage.setItem('username', username);  
                localStorage.setItem('token', token);
                alert(`Usuario ${username} creado exitosamente`);
            }
            catch (error) {
                alert("Error al crear usuario. " + error.message);
                setToken('');  // Comentar esta linea para testear lo de abajo
                
                /**
                 * Esto es solo para testear que se guarden los datos en el local storage
                 * (comentar ademas linea previa "setToken('')")
                 * 
                 * localStorage.setItem('username', username);
                 * localStorage.setItem('token', token);
                 * const saveduser = localStorage.getItem('username');
                 * const savedtoken = localStorage.getItem('token');
                 * alert("Usuario guardado exitosamente " + saveduser + " " + savedtoken);
                 */
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
                    value={username}
                /> 
                <Button label="Ingresar" onClick={handleClick}/>
            </div>
        </div>
    );
}

export default Login;