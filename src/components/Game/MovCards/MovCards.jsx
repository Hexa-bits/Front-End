import React, { useState } from "react";
import "./MovCards.css";

function MovCards({ movs_ids , onSelectedMov }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = (index) => {
    const mov_id = movs_ids[index];
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelectedMov(index === selectedIndex ? null : mov_id);
  };
  return (
    <div className="mov-cards-container">
      <div className="mov-card">
        {movs_ids.slice(0, 3).map((Id, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={index}
              className={`Figures ${isSelected ? "selected" : ""}`} 
              onClick={() => handleCardClick(index)}
            >
              <img
                src={`../../../../assets/Movements/mov${Id}.svg`}
                alt={`mov${Id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovCards;
