import React from "react";
import "./FigCards.css";
import { useState, useEffect } from "react";

function FigCards({ fig_cards, onSelecFigCard, isTurn }) {
  const [selectedIndex, setSelectedIndex] = useState(null); 

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (card, index) => {
    if (!isTurn) return; 
    setSelectedIndex(index === selectedIndex ? null : index);
    onSelecFigCard(card);
  };

  useEffect(() => {
    if (!isTurn) {
      setSelectedIndex(null);
    }
  }, [isTurn, onSelecFigCard]);

  return (
    <div className="fig-cards-container">
      <div className="fig-card">
        {fig_cards.slice(0, 3).map((card, index) => {
          const formattedId = card.fig.toString().padStart(2, "0"); // Convierte el número a cadena con dos dígitos
          const isSelected = index === selectedIndex; 
          return (
            <div
              key={card.id}
              className={`Figures 
                ${isTurn ? '' : 'disabled'}
                ${card.blocked ? "blocked" : (isSelected ? "selected" : "")}
              `} 
              onClick={() => handleCardClick(card, index)} 
            >
              <img
                src={`
                  ${card.blocked ? "assets/Figures/back-fig.svg" : `assets/Figures/fig${formattedId}.svg`}
                `}
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