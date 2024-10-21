import "./Home.css";
import useGames from "../../../../services/Home/useGames.js";
import Button from "../../../../components/Button/Button";
import GameList from "../../../../components/Game_List/Game_List.jsx";
import JoinGame from "../../../../utils/logics/Home/JoinGame.js";
import WsHomeService from "../../../../services/WS/WsHomeService.js";
import { useNavigate } from "react-router-dom";
import { WS_HOME, LOGIN } from "../../../../utils/Constants.js";
import Form from "../../../../components/Form/Form.jsx";
import { useState } from "react";

function Home() {
  const playerId = parseInt(localStorage.getItem("id_user"), 10);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(false);

  const { ws } = WsHomeService(WS_HOME);

  const { games } = useGames(ws);

  const handleCrearPartida = () => {
    navigate("/home/create-config");
  };

  const { joinGame } = JoinGame(ws);
  const handleJoin = (gameId) => {
    joinGame(gameId, playerId);
  };
  const handleChecked = (e) => {
    setSearch(e.target.checked);
  };

  return (
    <div className="Home">
      {/* <Button 
        onClick={() => navigate(LOGIN)} 
        className="back-btn" 
      /> */}
      <section className="NombreUsuario">
        <div className="dataUser">
          <div className="user">USUARIO: {username}</div>
          <div className="id_user"> ID: {playerId}</div>
        </div>
      </section>

      <section className="CrearPartida">
        <Button label="CREAR PARTIDA" onClick={handleCrearPartida} />
      </section>
      <div className="Gaming-container">
        <section className="Form__Home">
          <div className="form-check form-switch"></div>
          <input
            className={`form-check-input ${search ? "clicked" : "unclicked"} `}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={handleChecked}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Búsqueda por cantidad máxima de jugadores
          </label>
          <Form
            placeholder={
              search
                ? "Buscar por cantidad máxima de jugadores"
                : "Buscar por nombre"
            }
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </section>
        <section className="GameList__Home">
          <GameList
            games={games}
            handleJoin={handleJoin}
            filter={filter}
            search={search}
          />
        </section>
      </div>
    </div>
  );
}
export default Home;
