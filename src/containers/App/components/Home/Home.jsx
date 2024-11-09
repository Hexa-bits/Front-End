import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Form from "../../../../components/Form/Form.jsx";
import Button from "../../../../components/Button/Button";
import GameList from "../../../../components/Home/Game_List/Game_List.jsx";
import JoinForm from "../../../../components/Home/JoinForm/JoinForm.jsx";

import useGames from "../../../../services/Home/useGames.js";
import WsHomeService from "../../../../services/WS/WsHomeService.js";
import { WS_HOME, LOGIN, SETGAME } from "../../../../utils/Constants.js";

function Home() {
  const playerId = parseInt(sessionStorage.getItem("player_id"), 10);
  const playerName = sessionStorage.getItem("player_name");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [gameId, setGameId] = useState(0);

  const { ws } = WsHomeService(WS_HOME);
  const { games } = useGames(ws);

  const handleCrearPartida = () => {
    navigate(SETGAME);
  };

  const handleJoin = (game) => {
    setShowForm(true);
    setGameId(game.id);
  };

  const handleChecked = (e) => {
    setSearch(e.target.checked);
  };

  return (
    <div className="Home">
      <section className="NombreUsuario">
        <Button 
          onClick={() => navigate(LOGIN)} 
          className="back-btn" 
        />
        <div className="dataUser">
          <div className="user">USUARIO: {playerName}</div>
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
            icon="/assets/icons/buscar.png"
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

      {showForm && (
        <JoinForm gameId={gameId} playerId={playerId} setShowForm={setShowForm}/>
      )}
    </div>
  );
}

export default Home;