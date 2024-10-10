import React from "react";
import Button from "../../Button/Button.jsx";
import './LobbyButtons.css';

function LobbyButtons({ isOwner, onLeaveGame, onStartGame, oneJoined}) {
    return (
        <div className="btn-container">
            {isOwner ? (
                <>
                    <Button label="Abandonar" onClick={onLeaveGame} className="btn-leave" disabled={true}/>
                    <Button label="Iniciar" onClick={onStartGame} className="btn-start" disabled={oneJoined}/>
                </>
            ) : (
                <Button label="Abandonar" onClick={onLeaveGame} className="btn-leave"/>
            )}
        </div>
    );
};

export default LobbyButtons;
