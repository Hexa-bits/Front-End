import React from "react";
import LeaveButton from "../../components/Game/LeaveButton/LeaveButton.jsx";

import './VictoryBox.css';

function VictoryBox({ winnerName }) {
    return (
      <div className="victory-overlay">
        <div className="victory-box">
          <div className="text">
            ¡ {winnerName} es ganador !
          </div>
          <div className="but">
            <LeaveButton/>
          </div>
        </div>
      </div>
    );
  }
  

export default VictoryBox;