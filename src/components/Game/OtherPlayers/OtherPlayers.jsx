import FigCards from "../FigCards/FigCards";
import PlayerName from "../PlayerName/PlayerName";
import "./OtherPlayers.css";
function OtherPlayers({players, onPlayerSelected, onSelectFigToBlock}) {

    const handleBlockFig = (playerId, figCard) => {
        onPlayerSelected(playerId);
        onSelectFigToBlock(figCard);
    }
    
    return ( 
        <div className="players-container">
            { players.map((player, playerIndex) => (
                <div className="each-player" key={playerIndex}>
                    <div className="player-name"> 
                        <PlayerName label={playerIndex} player={player.nombre} />   
                    </div>
                    <div className="player-figs"> 
                        <FigCards 
                            fig_cards={player.fig_cards} 
                            onSelectedCardFig={(figCard) => handleBlockFig(player.id, figCard)}
                        />
                    </div>
                    <div className="cant-mov-container">
                        {Array.from({ length: player.mov_cant }, (_, movIndex) => (
                            <img key={movIndex} src="/assets/Movements/back-mov.svg" alt={movIndex} className="back-mov-image" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OtherPlayers;
