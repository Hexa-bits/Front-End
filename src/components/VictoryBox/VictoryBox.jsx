import React from "react";
import LeaveButton from "../../components/Game/LeaveButton/LeaveButton.jsx";

import './VictoryBox.css';

function VictoryBox({ winnerName, onLeave }) {
    return (
      <div className="victory-overlay">
        <div className="victory-box">
          <div className="text">
            ¡ {winnerName} ES GANADOR !
          </div>
          <div className="but">
            <LeaveButton onLeave={onLeave}/>
          </div>
        </div>
      </div>
    );
  }
  

export default VictoryBox;