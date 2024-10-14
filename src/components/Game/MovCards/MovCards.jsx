import React, { useState } from "react";
import "./MovCards.css";

function MovCards({ mov_cards , onSelectedMov }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelectedMov(index === selectedIndex ? null : mov_cards[index]);
  };
  return (
    <div className="mov-cards-container">
      <div className="mov-card">
        {mov_cards.slice(0, 3).map((card, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={card.id}
              className={`Figures ${isSelected ? "selected" : ""}`} 
              onClick={() => handleCardClick(index)}
            >
              <img
                src={`../../../../assets/Movements/mov${card.move}.svg`}
                alt={`mov${card.move}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovCards;
