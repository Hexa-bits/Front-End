import React from "react";
import Game_Item from "../Game_Item/Game_Item.jsx";
import "./Game_List.css";
import Fuse from "fuse.js";

function GameList({ games = [], handleJoin, filter, search }) {
  const fuseOptions = {
    keys: search ? ["max_players"] : ["game_name"],
    threshold: 0.3,
  };
  const fuse = new Fuse(games, fuseOptions);
  const filteredGames = filter
    ? fuse.search(filter).map((result) => result.item)
    : games;

  const startedGames = filteredGames.filter(game => game.started);
  const notStartedGames = filteredGames.filter(game => !game.started);

  return (
    <div className="GameList">
      {filteredGames.length === 0 ? (
        <ul className="list-group">
          <li className="list-group-item">No se encontraron partidas.</li>
        </ul>
      ) : (
        <>
          {startedGames.length > 0 && (
            <div className="started_List">
              <h3>Mis partidas comenzadas</h3>
              <ul className="list-group">
                {startedGames.map(game => (
                  <li className="started-games list-group-item" key={game.game_id}>
                    <Game_Item game={game} handleJoin={handleJoin} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {notStartedGames.length > 0 && (
            <div className="notStarted_List">
              <h3>Otras partidas </h3>
              <ul className="list-group">
                {notStartedGames.map(game => (
                  <li className="list-group-item" key={game.game_id}>
                    <Game_Item game={game} handleJoin={handleJoin} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GameList;
