import React from "react";
import Button from "../../Button/Button.jsx";
import { useNavigate } from 'react-router-dom';
import { GAME, HOME } from "../../../utils/Constants.js";
import './LobbyButtons.css';

function LobbyButtons({ isOwner }) {
    const navigate = useNavigate();

    return (
        <div className="btn-container">
            {isOwner ? (
                <Button label="Iniciar" onClick={() => navigate(GAME)} className="btn-start"/>
            ) : (
                <Button label="Abandonar" onClick={() => navigate(HOME)} className="btn-leave"/>
            )}
        </div>
    );
}

export default LobbyButtons;
