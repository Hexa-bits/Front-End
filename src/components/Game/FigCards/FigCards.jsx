import React from "react";
import "./FigCards.css";
import { useState } from "react";

function FigCards({ figs_ids }) {
  const [selectedIndex, setSelectedIndex] = useState(null); 

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); 
  };

  return (
    <div className="fig-cards-container">
      <div className="fig-card">
        {figs_ids.slice(0, 3).map((Id, index) => {
          const formattedId = Id.toString().padStart(2, "0"); // Convierte el número a cadena con dos dígitos
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
