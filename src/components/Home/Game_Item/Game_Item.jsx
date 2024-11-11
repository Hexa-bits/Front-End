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
                            <img src='../../../../assets/icons/lock.svg'/>
                            {game.game_name}
                            {game.started ? 
                                <img src="/assets/icons/usuario.png" className='started-icon'/>
                            : ""}
                        </div>
                    }

                    {!game.isPrivate && 
                        <div className="non-lock">
                            <div className='online-orb'></div>
                            {game.game_name}
                            {game.started ? 
                                <img src="/assets/icons/usuario.png" className='started-icon'/>
                            : ""}
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

