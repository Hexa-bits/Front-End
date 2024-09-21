import './Game_List.css';
import Game_Item from '../Game_Item/Game_Item.jsx';

function GameList({games, handleJoin}) {
    return (
        <div className="GameList">
            {games.length === 0 

                ?   <ul className="list-group">
                        <li className="list-group-item">No se encontraron partidas.</li>    
                    </ul>

                :   <ul className="list-group">
                        {games.map((game, index) => (
                            
                            <li className="list-group-item" key={game.id}>
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
