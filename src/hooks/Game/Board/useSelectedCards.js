import { useState } from 'react';

function useSelectedCards(isTurn) {
    const [selectedCards, setSelectedCards] = useState([]);

    const handlerSelectedCard = (rowIndex, colIndex) => {
        if (!isTurn) return; // Si no es el turno, no hace nada

        const index = `${rowIndex}-${colIndex}`; // Índice de la carta seleccionada

        if (selectedCards.includes(index)) {
            // Si la carta ya está seleccionada, la deselecciona
            setSelectedCards(selectedCards.filter(card => card !== index));
        } else {
            // Si ya hay dos fichas seleccionadas, deselecciona las anteriores
            if (selectedCards.length >= 2) {
                setSelectedCards([]);
            } else {
                // Si hay menos de dos fichas seleccionadas, añade la nueva
                setSelectedCards([...selectedCards, index]);
            }
        }
    };

    return { selectedCards, handlerSelectedCard };
}

export default useSelectedCards;