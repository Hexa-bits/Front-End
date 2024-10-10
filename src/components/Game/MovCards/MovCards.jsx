import React, { useState } from "react";
import "./MovCards.css";

function MovCards({ movs_ids }) {
  const [selectedIndex, setSelectedIndex] = useState(null); // Estado para la carta seleccionada

  // Manejador de clics para seleccionar una carta
  const handleCardClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index); // Desselecciona si ya está seleccionada
  };

  return (
    <div className="mov-cards-container">
      <div className="mov-card">
        {movs_ids.slice(0, 3).map((Id, index) => {
          const isSelected = index === selectedIndex; // Verifica si esta carta está seleccionada
          return (
            <div
              key={index}
              className={`Figures ${isSelected ? "selected" : ""}`} // Añade 'selected' si está seleccionada
              onClick={() => handleCardClick(index)} // Añade el manejador de clic
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
