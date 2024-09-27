import React from 'react';
import './LobbyCard.css';

function LobbyCard({ gameName, maxPlayers}) {
    return (  
        <div className="card text-bg-info mb-3">
            <div className="card-header">La partida comenzara pronto!</div>
            <div className="card-body">
                <h5 className="card-title"> 
                    Nombre de partida: <span className='game-name'>{gameName}</span>
                </h5>
                <p className="card-text"> 
                    Maxima cantidad de jugadores: <span className='max-players'>{maxPlayers}</span>
                </p>
            </div>
        </div>
    );
}

export default LobbyCard;