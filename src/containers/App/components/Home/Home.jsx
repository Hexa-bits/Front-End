import React from 'react';
import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleCrearPartida = () => {
    navigate("/home/create-config");
  };

  const { games, handleJoin} = useGames();

  return (
      <div className="Home">
        <section className="CrearPartida">
          <Button label="Crear Partida" onClick={handleCrearPartida} />
        </section>
        <section className="GameList__Home">
            <GameList games={games} handleJoin={handleJoin} />
        </section>
      </div>
  );
}



export default Home;
