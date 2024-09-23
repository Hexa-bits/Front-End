import React, { useEffect , useState } from "react";
import './Lobby.css';

import LobbyCard from "../../../../components/LobbyCard/LobbyCard.jsx";
import Button from "../../../../components/Button/Button.jsx";
import AnimatedEllipsis from "./AnimatedEllipsis.jsx";
import { useNavigate } from 'react-router-dom';
import { LOBBY_URL } from "../../../../utils/Constants.js"



import fetchMock from "fetch-mock";
fetchMock.config.overwriteRoutes = true;
fetchMock.get(LOBBY_URL, { 
    name: "PEPE",
    maxPlayers: 3,
    players: [
        { username: "player1" },
        { username: "player2" },
        { username: "player3" }
    ]
}); 

setTimeout(() => {
    fetchMock.get(LOBBY_URL, {
        name: "Juego de prueba",
        maxPlayers: 2,
        players: [
            { username: "player1" },
            { username: "player3" }
        ]
    });
}, 3000);


/*********************************************************************************************** */
// si entro desde el home a boton "unirme" a un juego, isOwner = false
// si entro despues de confirmar configuracion de juego, isOwner = true
function Lobby({ isOwner , gameId }) {
    isOwner = true;
    
    const navigate = useNavigate(); 
    const [players , setPlayers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    
    useEffect(() => {
        getGameInfo();
        const interval = setInterval(getGameInfo, 500);
        return () => clearInterval(interval);
    }, []);

    async function getGameInfo() {
 
        try {
            const response = await fetch( LOBBY_URL, {
                method: "GET", 
                header: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameid: 3 })
            })
            if (!response.ok) {
                throw new Error("Error al obtener información del juego.");
            }
            const data = await response.json();
            // RESPUESTA ESPERADA
            // {
                //     "name": "Juego de prueba",
                //     "maxPlayers": 3,
                //     "players": [
                    //         { "username": "player1" },
            //         { "username": "player2" },
            //         { "username": "player3" }
            //     ]
            // }
            console.log("Obteniendo información del juego...");
            
            setPlayers(data.players);
            setGameName(data.name); // se supone que el "listar" lo deja guardado
            setMaxPlayers(data.maxPlayers); // se supone que el "listar" lo deja guardado
            
        }
        catch (error) {
            alert("Error al obtener información del juego. " + error.message);
        }
    }
    
    
    return (  
        <div className="lobby-overlay">
            <div className='lobby-container'>
                <LobbyCard gameName={gameName} maxPlayers={maxPlayers} />

                <h3 className="list-title">Jugadores en espera<AnimatedEllipsis/></h3>
                <ul className="list-group list-group-flush">
                    {players.map((player, index) => (
                        <li key={index} className="list-group-item">{player.username}</li>
                    ))}
                </ul>

                <div className="btn-container">
                    <Button label="Abandonar" onClick={() => navigate('/home')} />
                    {isOwner && <Button label="Iniciar" onClick={() => navigate('/game')}/>}
                </div>
            </div>
        </div>
    );
}



export default Lobby;