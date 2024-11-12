import React from 'react'
import Button from '../../Button/Button.jsx'
import './Game_Item.css'

function Game_Item({ game, handleJoin }){
    return(
        <div className="List__Items">
            <div className={`game ${game.started ? "started" : ""}`}>
                <div className="config__left">
                    {game.isPrivate && 
                        <div className="lock">
                            <div className="lock-icon">
                                <img src='../../../../assets/icons/lock.png'/>  
                            </div>
                            {game.game_name}
                        </div>
                    }

                    {!game.isPrivate && 
                        <div className="non-lock">
                            <div className="unlock-icon">
                                <img src="/assets/icons/unlock.png"/>
                            </div>
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
                            disabled={game.current_players >= game.max_players && !game.started}/>
                    </div>
                </div>
            </div>
    )
}

export default Game_Item

