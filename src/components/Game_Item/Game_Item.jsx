import React from 'react'
import Button from '../Button/Button.jsx'
import './Game_Item.css'


function Game_Item({game, handleJoin}){

    return(
        <div className="List__Items">
                <div className="game">
                    <div className="config__left">{game.game_name}</div>
                    <div className="config__right">
                        <div className="range_players">
                            {game.current_players}/{game.max_players}
                        </div>
                        <Button 
                            label="Unirse" 
                            onClick={() => handleJoin(game.id)}
                            disabled={game.current_players >= game.max_players}/>
                    </div>
                </div>
            </div>
    )
}

export default Game_Item

