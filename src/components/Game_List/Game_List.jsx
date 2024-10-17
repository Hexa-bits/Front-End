import React from 'react';
import Game_Item from '../Game_Item/Game_Item.jsx';
import './Game_List.css';
import Fuse from 'fuse.js';

function GameList({games = [], handleJoin, filter}) {

    const fuseOptions = {
        keys: ['game_name'],
        threshold: 0.3,
    };
    const fuse = new Fuse(games, fuseOptions);
    const filteredGames = filter ? fuse.search(filter).map((result) => result.item) : games;

    return (
        <div className="GameList">
            {filteredGames.length === 0 

                ?   <ul className="list-group">
                        <li className="list-group-item">No se encontraron partidas.</li>    
                    </ul>

                :   <ul className="list-group">
                        {filteredGames.map((game, index) => (
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