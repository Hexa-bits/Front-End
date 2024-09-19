import './Game_Item.css'
import Button from '../Button/Button.jsx'


function Game_Item({game_name, game_min_players, game_max_players}){
    return(
        <div className="List__Items">
                <div className="game">
                    <div className="config__left">{game_name}</div>
                    <div className="config__right">
                        <div className="range_players">
                            {game_min_players}/
                            {game_max_players}
                        </div>
                        <Button label="Unirse" onClick={null}/>
                    </div>
                </div>
            </div>
    )
}

export default Game_Item

