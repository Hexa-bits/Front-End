import React from 'react';
import './seePlayer.css';

function seePlayer({ player }){
    return(
        <div className="playerTurn">
            <div className="text">
                Turno de {player}
            </div>
        </div>
    );
}


export default seePlayer;