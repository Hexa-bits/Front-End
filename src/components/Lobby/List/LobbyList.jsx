import React from "react";
import './LobbyList.css';
import DotsAnim from "../DotsAnim/DotsAnim.jsx";

function LobbyList({ players }) {
    return (
        <>
            <div className="list-header">
                <h3 className="list-title">Jugadores en espera</h3>
                <DotsAnim/>
            </div>
            <ul className="list-group list-group-flush">
            
                {players.map((player, index) => (
                    <li key={index} className="list-group-item">
                        {index === 0 ? (
                            <div>
                                {player} 
                                <i className="emoji-gemstone emoji-owner"></i>
                            </div> ) : ( player )
                        }
                    </li>
                ))}
            </ul>
        </>
    );
}

export default LobbyList;


