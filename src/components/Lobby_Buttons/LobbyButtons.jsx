import React from "react";
import Button from "../Button/Button.jsx";
import { useNavigate } from 'react-router-dom';
import { GAME } from  "../../utils/Constants.js";
import './LobbyButtons.css';

function LobbyButtons({ isOwner, leaveGame }) {
    const navigate = useNavigate();

    return (
        <div className="btn-container">
            {isOwner ? (
                <Button label="Iniciar" onClick={() => navigate(GAME)} />
            ) : (
                <Button label="Abandonar" onClick={leaveGame} />
            )}
        </div>
    );
}

export default LobbyButtons;
