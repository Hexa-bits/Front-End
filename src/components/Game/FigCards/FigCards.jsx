import React from "react";
import "./FigCards.css";
import { useState } from "react";

function FigCards({ fig_cards, onSelectedFig, isTurn }) {
  const [selectedIndex, setSelectedIndex] = useState(null); 

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (index) => {
    if (!isTurn) return; 
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelectedFig(index === selectedIndex ? null : fig_cards[index]);
  };

  useEffect(() => {
    if (!isTurn) {
      setSelectedIndex(null);
      onSelectedFig(null); 
    }
  }, [isTurn, onSelectedFig]);

  return (
    <div className="fig-cards-container">
      <div className="fig-card">
        {fig_cards.slice(0, 3).map((card, index) => {
          const isSelected = index === selectedIndex; 
          return (
            <div
              key={card.id}
              className={`Figures ${isSelected ? "selected" : ""}`} 
              onClick={() => handleCardClick(index)} 
            >
              <img
                src={`/assets/Figures/fig${card.fig}.svg`}
                alt={`fig${card.fig}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FigCards;
