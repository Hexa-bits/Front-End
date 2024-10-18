import FigCards from "../FigCards/FigCards";
import PlayerName from "../PlayerName/PlayerName";
import BackMovs from "../MovCards/BackMovs";
import "./OtherPlayers.css";
function OtherPlayers({players}) {


    return ( 
        <>
        { players.map((player, index) => (
            <div className="each-player" key={index}>
                <div className="player-name"> 
                    <PlayerName label={index} player={player.nombre} />   
                 </div>
                <div className="player-figs"> 
                    <FigCards fig_cards={player.fig_cards} />
                </div>
                <div className="cant-mov-container">
                    {Array.from({ length: player.mov_cant }, () => (
                        <img key={index} src="/assets/Movements/back-mov.svg" alt={index} className="back-mov-image" />
                    ))}
                </div>
            </div>
        ))}
        </>
    );
}

export default OtherPlayers;