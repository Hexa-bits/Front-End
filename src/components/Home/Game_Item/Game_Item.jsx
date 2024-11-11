import React from 'react'
import Button from '../../Button/Button.jsx'
import './Game_Item.css'

function Game_Item({game, handleJoin, isPrivate}){
    isPrivate = game.isPrivate
    return(
        <div className="List__Items">
                <div className="game">
                    <div className="config__left">

                        {isPrivate && 
                            <div className="lock">
                                <img src='../../../../assets/icons/lock.svg'/>
                                {game.game_name}
                            </div>
                            }

                        {!isPrivate && 
                            <div className="non-lock">
                                {game.game_name}
                            </div>
                        }
                    </div>
                    <div className="config__right">
                        <div className="range_players">
                            {game.current_players}/{game.max_players}
                        </div>

                        <Button 
                            label="UNIRSE" 
                            onClick={() => handleJoin(game)}
                            disabled={game.current_players >= game.max_players}/>
                    </div>
                </div>
            </div>
    )
}

export default Game_Item

