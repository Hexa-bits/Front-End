import "./ConfigGame.css";
import { useState } from "react";
import Form from "../../components/Form/Form.jsx";
import Button from "../../components/Button/Button.jsx";
import React from "react";

function ConfigGame({ 
        handleName, 
        handlePassword, 
        maxPlayers, 
        setPlayerAmnt,
        isPrivate,
        setPrivate
    }) {

  const [selectedPlayers, setSelectedPlayers] = useState(null);

  const handlePlayerSelect = (num) => {
    setPlayerAmnt(num);
    setSelectedPlayers(num);
  };

  return (
    <div className="ConfigGame">
      <Form
        label="NOMBRE DE PARTIDA"
        type="text"
        placeholder="Ingrese un nombre"
        id="gameName"
        onChange={handleName}
      />

      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
          onChange={(e)=> setPrivate(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Partida privada
        </label>
      </div>
      {isPrivate && (
        <div className="password">
          <Form
            type="password"
            placeholder="Ingresar contraseña"
            id="gamePassword"
            onChange={handlePassword}
            icon="/assets/icons/clave.png"
          />
        </div>
      )}
      

      <p>Elige la cantidad de participantes</p>

      <div className="count_players">
        <Button
          className={selectedPlayers === 2 ? 'selected' : ''}
          label="2"
          onClick={() => handlePlayerSelect(2)}
        />
        <Button
          className={selectedPlayers === 3 ? 'selected' : ''}
          label="3"
          onClick={() => handlePlayerSelect(3)}
        />
        <Button
          className={selectedPlayers === 4 ? 'selected' : ''}
          label="4"
          onClick={() => handlePlayerSelect(4)}
        />
      </div>
      <div className="participants">
        <p data-testid="player-count">
          {maxPlayers > 0 && `Participantes: ${maxPlayers}`}
        </p>
      </div>
    </div>
  );
}


export default ConfigGame;