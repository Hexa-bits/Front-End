import { useState } from 'react';

function useSelectedCards(isTurn) {
    const [selectedCards, setSelectedCards] = useState([]);

    const handlerSelectedCard = (rowIndex, colIndex ) => {
        if (!isTurn) return; // Si no es el turno, no hace nada

        const card = {x: rowIndex, y: colIndex }; // objeto ficha

        const isSelected = selectedCards.some(selectedCard => 
            selectedCard.x === rowIndex && selectedCard.y === colIndex
        );
        if (isSelected) {
            // Si la carta ya está seleccionada, la deselecciona
            setSelectedCards(selectedCards.filter(
                selectedCard => selectedCard.x !== rowIndex || selectedCard.y !== colIndex)
            );
        } else {
            // Si ya hay dos fichas seleccionadas, deselecciona las anteriores
            if (selectedCards.length >= 2) {
                setSelectedCards([card]);
            } else {
                // Si hay menos de dos fichas seleccionadas, añade la nueva
                setSelectedCards([...selectedCards, card]);
            }
        }
    };

    return { selectedCards, handlerSelectedCard };
}

export default useSelectedCards;