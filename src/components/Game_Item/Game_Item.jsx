import './Game_Item.css'
import Button from '../Button/Button.jsx'


function Game_Item({game, handleJoin}){

    const isDisabled  = game.current_players >= game.max_players;
    return(
        <div className="List__Items">
                <div className="game">
                    <div className="config__left">{game.name}</div>
                    <div className="config__right">
                        <div className="range_players">
                            {game.current_players}/{game.max_players}
                        </div>
                        <Button 
                        label="Unirse" 
                        onClick={() => handleJoin(game.id)}
                        disabled={isDisabled}/>
                    </div>
                </div>
            </div>
    )
}

export default Game_Item

