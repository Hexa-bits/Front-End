import FigCards from "../FigCards/FigCards";
import PlayerName from "../PlayerName/PlayerName";
import "./OtherPlayers.css";
function OtherPlayers({players}) {
    return ( 
        <>
        { players.map((player, index) => (
            <div className="each-player">
              
                <div key={index}></div>
                <div className="player-name"> 
                    <PlayerName label={index} player={player.nombre} />   
                 </div>
                <div className="player-figs"> 
                    <FigCards fig_cards={player.fig_cards} />
                </div>
            </div>
        ))}
        </>
    );
}

export default OtherPlayers;