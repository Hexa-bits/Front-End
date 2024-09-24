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
                <Button className="btn btn-start" label="Iniciar" onClick={() => navigate(GAME)} />
            ) : (
                <Button className="btn btn-leave" label="Abandonar" onClick={leaveGame} />
            )}
        </div>
    );
}

export default LobbyButtons;
