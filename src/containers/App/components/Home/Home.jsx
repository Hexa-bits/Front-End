import './Home.css';
import React from 'react';
import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
import { useHomeLogic } from '../../../../utils/logics/Home/LogicJoinGame.js';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleCrearPartida = () => {
    navigate("/home/create-config");
  };

  const { games } = useGames();
  const { handleJoin } = useHomeLogic(games);
  const user = localStorage.getItem("username");
  const user_id = localStorage.getItem("id_user");
  return (
      <div className="Home">
        <section className="NombreUsuario">
            <div className="dataUser">
              <div className="user">Usuario: {user}</div>
              <div className="id_user"> Id_Usuario: {user_id}</div>
          </div>
        </section>

        <section className="CrearPartida">
          <Button 
            label="Crear Partida" 
            onClick={handleCrearPartida} 
          />
        </section>
        
        <section className="GameList__Home">
            <GameList 
            games={games} 
            handleJoin={handleJoin} 
            />
        </section>
      </div>
  );
}

export default Home;
