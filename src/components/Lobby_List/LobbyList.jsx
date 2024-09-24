import React from "react";
import AnimatedEllipsis from "../AnimatedEllipsis/AnimatedEllipsis.jsx";
import './LobbyList.css';

function LobbyList({ players }) {
    return (
        <>
            <h3 className="list-title">Jugadores en espera<AnimatedEllipsis/></h3>
            <ul className="list-group list-group-flush">
                {players.map((player, index) => (
                    <li key={index} className="list-group-item">{player.username}</li>
                ))}
            </ul>
        </>
    );
}

export default LobbyList;
