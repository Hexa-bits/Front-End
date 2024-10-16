import "./ConfigGame.css";
import { useState } from "react";
import Form from "../../components/Form/Form.jsx";
import Button from "../../components/Button/Button.jsx";
import React from "react";

function ConfigGame({ handleOnChange, maxPlayers, setPlayerAmnt}) {

  const [selectedPlayers, setSelectedPlayers] = useState(null);

  const handlePlayerSelect = (num) => {
    setPlayerAmnt(num);
    setSelectedPlayers(num);
  };

  return (
    <div className="ConfigGame">
      <Form
        label="NOMBRE DE PARTIDA"
        helpText="Debe tener entre 1 y 10 caracteres"
        type="text"
        placeholder="Ingrese un nombre"
        id="gameid"
        onChange={handleOnChange}
      />

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