import { useState, useEffect } from 'react';

function useSelectedCards(isTurn) {
    const [selectedCards, setSelectedCards] = useState([]);
    const clearSelection = () => setSelectedCards([]);
    const handlerSelectedCard = (rowIndex, colIndex ) => {
        if (!isTurn) return;

        const card = {x: rowIndex, y: colIndex }; // objeto ficha

        const isSelected = selectedCards.some(selectedCard => 
            selectedCard.x === rowIndex && selectedCard.y === colIndex
        );

        if (isSelected) {
            // Si la carta ya está seleccionada, la deselecciona
            setSelectedCards(selectedCards.filter(
                selectedCard => selectedCard.x !== rowIndex || selectedCard.y !== colIndex)
            );
        } 
        else {
            // Si la carta no está seleccionada, la selecciona
            setSelectedCards([...selectedCards, card]);
        }
    };

    // Deselecciona todas las cartas cuando el turno termine
    useEffect(() => {
        if (!isTurn) {
            clearSelection(); // Limpiar las cartas seleccionadas al finalizar el turno
        } 
    }, [isTurn]);

    return { selectedCards, handlerSelectedCard };
}

export default useSelectedCards;