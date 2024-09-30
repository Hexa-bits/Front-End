import React from "react";
import Button from '../Button/Button.jsx';
import './VictoryBox.css';

function VictoryBox({ winnerName }) {
    return (
      <div className="victory-overlay">
        <div className="victory-box">
          <div className="text">
            You win, {winnerName}!
          </div>
          <div className="but">
            <Button label="Volver a Home" onClick={()=>{}}/>
          </div>
        </div>
      </div>
    );
  }
  

export default VictoryBox;