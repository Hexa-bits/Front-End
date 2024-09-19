import './Game_List.css';
import Game_Item from '../Game_Item/Game_Item.jsx';

function GameList({ games }) {
    return (
        <div className="GameList">
            {games.length === 0 

                ?   <ul className="list-group">
                        <li className="list-group-item">No se encontraron partidas.</li>    
                    </ul>

                :   <ul className="list-group">
                        {games.map((game, index) => (
                            
                            <li className="list-group-item" key={index}>
                                <Game_Item 
                                game_name={game.name} 
                                game_min_players={game.min_players} 
                                game_max_players={game.max_players}
                                />
                            </li>
                        ))}
                    </ul>
            }
        </div>
    );
}


export default GameList;
