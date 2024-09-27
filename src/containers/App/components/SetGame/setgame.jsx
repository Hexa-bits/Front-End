import "./setgame.css";
import React from "react";
import Button from "../../../../components/Button/Button.jsx";
import Form from "../../../../components/Form/Form.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../utils/Constants.js";
import { CONFIG_URL } from "../../../../utils/Constants.js";

//Botón para entrar a una partida + interfaz partida

function Start() {
  const navigate = useNavigate();

  const [game_name, setGameName] = useState(""); //nombre ingresado del juego

  const [max_players, SetPlayerAmnt] = useState(0); //cant de jugadores ingresados

  const helpText = "debe tener entre 1 y 10 caracteres";

  const placeholder = "ingrese un nombre";

  const port = 8000;

  const id_user = localStorage.getItem("id_usser");

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
    try {
      const response = await fetch(CONFIG_URL, {
        method: "POST", //esta función responde al async de handleclick
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_user, game_name, max_players }), //creo que acá debería mandar tambien el id del owner
      });

      if (!response.ok) {
        throw new Error("Error al enviar solicitud 'crear partida'. ");
      }

      const data = await response.json(); //va a hacer que espere a que el back devuelva algo (el id) y ahí le va a asignar la data al id de la partida
      const { game_id } = data.id;

      localStorage.setItem("game_name", game_name); //guardo en el local storage el nombre e id de la partida
      localStorage.setItem("game_id", game_id);
      localStorage.setItem("max_players", max_players);

      alert(`Partida ${game_name} creada exitosamente con Id: ${data.id}`);
      navigate("/game/join"); //DEBERIA NAVEGAR AL GAME
    } catch (error) {
      alert("Error al crear partida. " + error.message);
    }
  }
  const handleClick = async () => {
    if (checkInput(game_name) && checkbuttons(max_players)) {
      //si el botón está clickeado confirmo que el nombre y la cant de jugadores sea valido
      create(); //llamo a la función que hace la conexión
    } else {
      if (!checkInput(game_name)) {
        alert("error, el nombre debe tener entre 1 y 10 caracteres");
      } else if (!checkbuttons(max_players)) {
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
      <h1>
        Elige la cantidad de participantes
        <p data-testid="asd">
          {max_players > 0 && `Participantes: ${max_players}`}
        </p>
      </h1>
      <Button label="2" onClick={() => SetPlayerAmnt(2)} />
      <Button label="3" onClick={() => SetPlayerAmnt(3)} />
      <Button label="4" onClick={() => SetPlayerAmnt(4)} />
      <h1> </h1>
      <h1> </h1>
      <Button label="Crear partida" onClick={handleClick} />
    </div>
  );
}

export default Start;
