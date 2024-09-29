import React from 'react';
import './FigCards.css';
import { useState } from 'react';

function FigCards({ figsIds }) {
    const [selectedIndex, setSelectedIndex] = useState(null); // Estado para la carta seleccionada

    // Manejador de clics para seleccionar una carta
    const handleCardClick = (index) => {
        setSelectedIndex(index === selectedIndex ? null : index); // Desselecciona si ya está seleccionada
    };

    return (
        <div className="fig-cards-container">
            <div className='fig-card'>
                {figsIds.map((Id, index) => {
                    const formattedId = Id.toString().padStart(2, '0'); // Convierte el número a cadena con dos dígitos
                    const isSelected = index === selectedIndex; // Verifica si esta carta está seleccionada
                    return (
                        <div 
                            key={index} 
                            className={`Figures ${isSelected ? 'selected' : ''}`} // Añade 'selected' si está seleccionada
                            onClick={() => handleCardClick(index)} // Añade el manejador de clic
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