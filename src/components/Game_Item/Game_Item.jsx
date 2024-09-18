import './Game_Item.css'
import Button from '../Button/Button.jsx'


function Game_Item(){
    //Prueba de datos
    const game = {
        name: "Nombre del juego",
        min_players: 2,
        max_players: 4,
    }
    return(
        <div className="List__Items">
                <div className="game">
                    <div className="config">
                        <span>{game.name}</span>
                        <div className="range_players">
                            {game.min_players}/
                            {game.max_players}
                        </div>

                    </div>
                </div>
                <Button label="Unirse" onClick={null}/>
            </div>
    )
}

export default Game_Item