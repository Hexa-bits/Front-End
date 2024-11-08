import React, { useState, useEffect } from "react";
import "./MovCards.css";

function MovCards({ mov_cards , onSelectedMov, isTurn }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = (index) => {
    if (!isTurn) return; 
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelectedMov(index === selectedIndex ? null : mov_cards[index]);
  };

  useEffect(() => {
    if (!isTurn) {
      setSelectedIndex(null); // Deselecciona la carta cuando termina el turno
      onSelectedMov(null); // Notifica que no hay carta seleccionada
    }
  }, [isTurn, onSelectedMov]);

  return (
    <div className="mov-cards-container">
      <div className="mov-card">
        {mov_cards.slice(0, 3).map((card, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={card.id}
              className={`Movs 
                ${isTurn ? "" : "disabled"}
                ${isSelected ? "selected" : ""}
              `} 
              onClick={() => handleCardClick(index)}
            >
              <img
                src={`/assets/Movements/mov${card.move}.svg`}
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