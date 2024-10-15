import React from 'react';
import './LobbyCard.css';

function LobbyCard({ gameName, maxPlayers}) {
    return (  
        <div className="card text-bg-info mb-3 card-container">
            <div className="card-header">LA PARTIDA COMENZARA PRONTO!</div>
            <div className="card-body">
                <h5 className="card-title"> 
                    • Partida <span className='game-name'>{gameName}</span>
                </h5>
                <p className="card-text"> 
                    • Maximo <span className='max-players'>{maxPlayers}</span> jugadores
                </p>
            </div>
        </div>
    );
}

export default LobbyCard;