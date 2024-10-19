import FigCards from "../FigCards/FigCards";
import PlayerName from "../PlayerName/PlayerName";
import "./OtherPlayers.css";
function OtherPlayers({players}) {


    return ( 
        <>
        { players.map((player, playerIndex) => (
            <div className="each-player" key={playerIndex}>
                <div className="player-name"> 
                    <PlayerName label={playerIndex} player={player.nombre} />   
                 </div>
                <div className="player-figs"> 
                    <FigCards fig_cards={player.fig_cards} />
                </div>
                <div className="cant-mov-container">
                    {Array.from({ length: player.mov_cant }, (_, movIndex) => (
                        <img key={movIndex} src="/assets/Movements/back-mov.svg" alt={movIndex} className="back-mov-image" />
                    ))}
                </div>
            </div>
        ))}
        </>
    );
}

export default OtherPlayers;