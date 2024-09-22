import React from 'react';
import Game_Item from '../Game_Item/Game_Item.jsx';
import './Game_List.css';

function GameList({games = [], handleJoin}) {
    return (
        <div className="GameList">
            {games.length === 0 

                ?   <ul className="list-group">
                        <li className="list-group-item">No se encontraron partidas.</li>    
                    </ul>

                :   <ul className="list-group">
                        {games.map((game, index) => (
                            
                            <li className="list-group-item" key={game.game_id}>
                                <Game_Item 
                                game={game}
                                handleJoin={handleJoin}
                                />
                            </li>
                        ))}
                    </ul>
            }
        </div>
    );
}


export default GameList;
