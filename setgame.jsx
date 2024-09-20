import "./setgame.css";
import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { useState } from "react";
import fetchMock from "fetch-mock";
import { useNavigate } from "react-router-dom";
import "../../../../utils/Constants.js";
import "../Login/Login.css";
import {
  ConfigHelpText,
  CREATE_CONFIG_URL,
} from "../../../../utils/Constants.js";

fetchMock.post(CREATE_CONFIG_URL, { Id: 10 }); // MOCK TEST

//Botón para entrar a una partida + interfaz partida

function Start() {
  const [startbutton, setStartbutton] = useState(0); //botón crear partida

  const [gameName, setGameName] = useState(""); //nombre ingresado del juego

  const [playerAmnt, SetPlayerAmnt] = useState(0); //cant de jugadores ingresados

  const helpText = "debe tener entre 1 y 10 caracteres";

  const placeholder = "ingrese un nombre";

  const port = 8000;

  const checkInput = (input) => {
    //va a chequear que el nombre es valido
    return input.length > 0 && input.length <= 10;
  };

  const checkbuttons = (input) => {
    // va a chequear q la cant de jugadores se ingreso
    return input > 1;
  };

  const handleonchange = (e) => {
    //va a setear el nuevo nombre con lo ingressado
    setGameName(e.target.value);
  };

  async function create() {
    //esta función va a mandar al back la info de la partida
    try {
      const response = await fetch(CREATE_CONFIG_URL, {
        method: "POST", //esta función responde al async de handleclick
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameName, playerAmnt }), //creo que acá debería mandar tambien el id del owner
      });

      if (!response.ok) {
        //en caso de que pase algo no deseado al conectar
        throw new Error("Error al enviar solicitud 'crear partida'. ");
      }

      const data = await response.json(); //va a hacer que espere a que el back devuelva algo (el id) y ahí le va a asignar la data al id de la partida
      const { Id } = data;

      alert(`Partida ${gameName} creada exitosamente con Id: ${Id}`);
      localStorage.setItem("gamename", gameName); //guardo en el local storage el nombre e id de la partida
      localStorage.setItem("gameid", Id);
      //navigate("/home"); //acá tendría que navegar al lobby
    } catch (error) {
      //EN CASO DE QUE FALLE ALGO
      alert("Error al crear partida. " + error.message);
    }
  }

  if (startbutton === 0) {
    //Si el botón de crear partida no está clickeado
    return (
      <div>
        <h1>Bienvenido a el Switcher</h1>
        <Button
          label="Crear partida"
          onClick={(startbutton) => setStartbutton(1)} //una vez clickeado cambio el estado
        />
      </div>
    );
  } else {
    const handleClick = async () => {
      if (checkInput(gameName) && checkbuttons(playerAmnt)) {
        //si el botón está clickeado confirmo que el nombre y la cant de jugadores sea valido
        //localStorage.getItem = ("ownerId", id); //no estoy segura si esto debería estar acá
        create(); //llamo a la función que hace la conexión
      } else {
        if (!checkInput(gameName)) {
          alert("error, el nombre debe tener entre 1 y 10 caracteres");
        } else if (!checkbuttons(playerAmnt)) {
          alert("error, la cantidad de jugadores es invalida");
        }
      }
    };

    return (
      <div>
        <h1>Bienvenido a el Switcher</h1>
        <Form
          label="Nombre de la partida"
          helpText={helpText}
          type="text"
          placeholder={placeholder}
          id="gameid"
          onChange={handleonchange}
        />
        <h1>Elegí la cantidad de participantes</h1>
        <Button label="2" onClick={() => SetPlayerAmnt(2)} />
        <Button label="3" onClick={() => SetPlayerAmnt(3)} />
        <Button label="4" onClick={() => SetPlayerAmnt(4)} />
        <h1> </h1>
        <h1> </h1>
        <Button label="Crear partida" onClick={handleClick} />
      </div>
    );
  }
}

export default Start;
