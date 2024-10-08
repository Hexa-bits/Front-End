import './Home.css';
import useGames from '../../../../hooks/Home/useGames.js';
import Button from "../../../../components/Button/Button";
import GameList from '../../../../components/Game_List/Game_List.jsx';
import { useHomeLogic } from '../../../../utils/logics/Home/LogicJoinGame.js';
import { useNavigate } from "react-router-dom";
import { WS_HOME } from '../../../../utils/Constants.js';

function Home() {

    //Establezco conexión WS para HOME
    const ws = new WebSocket(WS_HOME);
    const gameId = localStorage.getItem('game_id');
    const username = localStorage.getItem("username");
    const playerId = parseInt(localStorage.getItem("id_user"),10);

    const navigate = useNavigate();
    const handleCrearPartida = () => {
    ws.close();
    navigate("/home/create-config");
    };

    //Lista de Partidas
    const { games } = useGames(ws);
    //Manejador de unirse a partida
    const handleJoin = () => { useHomeLogic(ws, gameId, playerId); };

    return (
        <div className="Home">
            <section className="NombreUsuario">
                <div className="dataUser">
                <div className="user">Usuario: {username}</div>
                <div className="id_user"> Id_Usuario: {playerId}</div>
            </div>
            </section>

            <section className="CrearPartida">
            <Button 
                label="Crear Partida" 
                onClick={handleCrearPartida} 
            />
            </section>
            
            <section className="GameList__Home">
                <GameList 
                games={games} 
                handleJoin={handleJoin} 
                />
            </section>
        </div>
    );
}

export default Home;
