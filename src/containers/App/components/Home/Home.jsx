import './Home.css';
import GameList from '../../../../components/Game_List/Game_List.jsx';

function Home() {
    // Datos de prueba
    const games = [
        { name: "Juego 1", min_players: 1, max_players: 4 },
        { name: "Juego 2", min_players: 1, max_players: 2 },
        { name: "Juego 3", min_players: 1, max_players: 3 }
    ];
    return (
        <section className="GameList__Home">
            <GameList games={games}/>
        </section>
    );
}

export default Home;
