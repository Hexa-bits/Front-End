import React from "react";
import "./FigCards.css";
import { useState, useEffect } from "react";

function FigCards({ fig_cards, onSelectedCardFig, isTurn }) {
  const [selectedIndex, setSelectedIndex] = useState(null); 

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (index) => {
    if (!isTurn) return; 
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelectedCardFig(index === selectedIndex ? null : fig_cards[index]);
  };

  useEffect(() => {
    if (!isTurn) {
      setSelectedIndex(null);
    }
  }, [isTurn, onSelectedCardFig]);

  return (
    <div className="fig-cards-container">
      <div className="fig-card">
        {fig_cards.slice(0, 3).map((card, index) => {
          const formattedId = card.fig.toString().padStart(2, "0"); // Convierte el número a cadena con dos dígitos
          const isSelected = index === selectedIndex; 
          return (
            <div
              key={card.id}
              className={`Figures ${isSelected ? "selected" : ""}`} 
              onClick={() => handleCardClick(index)} 
            >
              <img
                src={`/assets/Figures/fig${formattedId}.svg`}
                alt={`fig${formattedId}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FigCards;