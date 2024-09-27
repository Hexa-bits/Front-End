import React from "react";
import AnimatedEllipsis from "../AnimatedEllipsis/AnimatedEllipsis";
import './LobbyList.css';

function LobbyList({ players }) {
    return (
        <>
            <h3 className="list-title">Jugadores en espera<AnimatedEllipsis/></h3>
            <ul className="list-group list-group-flush">
                {players.map((player, index) => (
                    <li key={index} className="list-group-item">{player}</li>
                ))}
            </ul>
        </>
    );
}

export default LobbyList;


