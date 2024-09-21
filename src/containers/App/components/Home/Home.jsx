import './Home.css';
import GameList from '../../../../components/Game_List/Game_List.jsx';
import { useState } from 'react'


function Home() {
    // Datos de prueba
    const [games, setGames] = useState([
        { id:"1", name: "Juego 1", current_players: 1, max_players: 4 },
        { id:"2", name: "Juego 2", current_players: 2, max_players: 4 },
        { id:"3", name: "Juego 3", current_players: 1, max_players: 4 },
        { id:"4", name: "Juego 4", current_players: 2, max_players: 4 }        
    ]);


    // Función para manejar la unión a una partida
    /*
     * Tener en cuenta que esto debe mandar un put al back para actualizar la cantidad de jugadores en sala
     */
    const handleJoin = (id) => {

        setGames((prevGames) =>
            prevGames.map((game) => {
                if (game.id === id) {
                    if (game.current_players < game.max_players) {
                        // Incrementar el número de jugadores actuales
                        return { ...game, current_players: game.current_players + 1 };
                    }
                }
                return game;
            })
        );
    }; 

    return (
        <section className="GameList__Home">
            <GameList games={games} handleJoin={handleJoin}/>
        </section>
    );
}

export default Home;
