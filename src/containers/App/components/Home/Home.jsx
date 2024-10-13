import "./Home.css";
import useGames from "../../../../services/Home/useGames.js";
import Button from "../../../../components/Button/Button";
import GameList from "../../../../components/Game_List/Game_List.jsx";
import JoinGame from "../../../../utils/logics/Home/JoinGame.js";
import WsHomeService from "../../../../services/WS/WsHomeService.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WS_HOME, LOGIN } from "../../../../utils/Constants.js";

function Home() {
  const playerId = parseInt(localStorage.getItem("id_user"), 10);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const { ws } = WsHomeService(WS_HOME);

  const { games } = useGames(ws);

  const handleCrearPartida = () => {
    navigate("/home/create-config");
  };

  const { joinGame } = JoinGame(ws);
  const handleJoin = (gameId) => {
    joinGame(gameId, playerId);
  };

  return (
    <div className="Home">
      <Button 
        onClick={() => navigate(LOGIN)} 
        className="back-btn" 
      />
      <section className="NombreUsuario">
        <div className="dataUser">
          <div className="user">Usuario: {username}</div>
          <div className="id_user"> Id_Usuario: {playerId}</div>
        </div>
      </section>

      <section className="CrearPartida">
        <Button label="CREAR PARTIDA" onClick={handleCrearPartida} />
      </section>

      <section className="GameList__Home">
        <GameList games={games} handleJoin={handleJoin} />
      </section>
    </div>
  );
}

export default Home;
