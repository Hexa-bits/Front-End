import "./GameName.css";

function GameName() {
    
    const gameName = sessionStorage.getItem("game_name");

    return (
      <div className="gameName__container">
        Estás jugando en {gameName}
      </div>
    );
}

export default GameName;