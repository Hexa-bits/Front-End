import React from "react";
import "./FigCards.css";
import { useState } from "react";

function FigCards({ fig_cards }) {
  const [selectedIndex, setSelectedIndex] = useState(null); 

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); 
  };

  return (
    <div className="fig-cards-container">
      <div className="fig-card">
        {fig_cards.slice(0, 3).map((card, index) => {
          const formattedId = card.fig.toString().padStart(2, "0"); // Convierte el número a cadena con dos dígitos
          const isSelected = index === selectedIndex; 
          return (
            <div
              key={index}
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
