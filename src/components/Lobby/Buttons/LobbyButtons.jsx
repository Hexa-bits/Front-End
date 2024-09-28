import React from "react";
import Button from "../../Button/Button.jsx";
import { useNavigate } from 'react-router-dom';
import { GAME, HOME , GAME_LEAVE_URL} from "../../../utils/Constants.js";
import './LobbyButtons.css';

function LobbyButtons({ isOwner, onLeaveGame}) {
    return (
        <div className="btn-container">
            {isOwner ? (
                <Button label="Iniciar" onClick={() => navigate(GAME)} className="btn-start"/>
            ) : (
                <Button label="Abandonar" onClick={onLeaveGame} className="btn-leave"/>
            )}
        </div>
    );
};

export default LobbyButtons;
