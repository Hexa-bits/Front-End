import { useState } from 'react';

function useSelectedCards(isTurn) {
    const [selectedCards, setSelectedCards] = useState([]);

    const handlerSelectedCard = (rowIndex, colIndex) => {
        if(!isTurn) return;

        const index = `${rowIndex}-${colIndex}`;

        if (selectedCards.includes(index)) {
            setSelectedCards(selectedCards.filter(card => card !== index));
        } else {
            if (selectedCards.length >= 2) {
                // Si ya hay dos fichas seleccionadas, resetea la selección y selecciona la nueva
                setSelectedCards([index]);
            } else {
                // Si hay menos de dos fichas, agrega la nueva
                setSelectedCards([...selectedCards, index]);
            }
        }
    };

    return { selectedCards, handlerSelectedCard };
}

export default useSelectedCards;