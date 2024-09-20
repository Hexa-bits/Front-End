import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchMock from "fetch-mock";

import "../../../../utils/Constants.js";
import "./Login.css";
import { LoginHelpText, LOGIN_URL } from "../../../../utils/Constants.js";

fetchMock.post(LOGIN_URL, { Id: 3 }); // MOCK TEST

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  /**
   *  Hook that executes when the component is rendered
   *  It is used to get the username from the local storage if it exists
   */
  useEffect(() => {
    const savedUserName = localStorage.getItem("username");
    if (savedUserName) {
      setUsername(savedUserName);
    }
  }, []);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const checkInput = (input) => {
    return input.length > 0 && input.length <= 10;
  };

  async function register() {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar solicitud 'crear usuario'. ");
      }

      const data = await response.json();
      const { Id } = data;

      alert(`Usuario ${username} creado exitosamente con Id: ${Id}`);
      localStorage.setItem("username", username);
      localStorage.setItem("id_usser", Id);
      navigate("/home");
    } catch (error) {
      alert("Error al crear usuario. " + error.message);
    }
  }

  const handleInput = () => {
    if (checkInput(username)) {
      const savedUserName = localStorage.getItem("username");
      if (username !== savedUserName) {
        register();
      } else {
        navigate("/home");
      }
    } else {
      alert("Nombre " + LoginHelpText);
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
          helpText={LoginHelpText}
          id="inputUsername"
          onChange={handleChange}
          value={username}
        />
        <Button label="Ingresar" onClick={handleInput} />
      </div>
    </div>
  );
}

export default Login;
