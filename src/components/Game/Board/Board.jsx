import './Board.css';
import BoxCard from './BoxCard/BoxCard';
import useSelectedCards from '../../../hooks/Game/Board/useSelectedCards';

//A modo de Ejemplo
const cardData = [
    { x: 0, y: 0, color: 'red' },
    { x: 0, y: 1, color: 'red' },
    { x: 0, y: 2, color: 'red' },
    { x: 0, y: 3, color: 'red' },
    { x: 0, y: 4, color: 'red' },
    { x: 0, y: 5, color: 'red' },
    { x: 1, y: 0, color: 'blue' },
    { x: 1, y: 1, color: 'blue' },
    { x: 1, y: 2, color: 'blue' },
    { x: 1, y: 3, color: 'blue' },
    { x: 1, y: 4, color: 'blue' },
    { x: 1, y: 5, color: 'blue' },
    { x: 2, y: 0, color: 'green' },
    { x: 2, y: 1, color: 'green' },
    { x: 2, y: 2, color: 'green' },
    { x: 2, y: 3, color: 'green' },
    { x: 2, y: 4, color: 'green' },
    { x: 2, y: 5, color: 'green' },
    { x: 3, y: 0, color: 'yellow' },
    { x: 3, y: 1, color: 'yellow' },
    { x: 3, y: 2, color: 'yellow' },
    { x: 3, y: 3, color: 'yellow' },
    { x: 3, y: 4, color: 'yellow' },
    { x: 3, y: 5, color: 'yellow' },
    { x: 4, y: 0, color: 'red' },
    { x: 4, y: 1, color: 'red' },
    { x: 4, y: 2, color: 'red' },
    { x: 4, y: 3, color: 'red' },
    { x: 4, y: 4, color: 'red' },
    { x: 4, y: 5, color: 'red' },
    { x: 5, y: 0, color: 'blue' },
    { x: 5, y: 1, color: 'blue' },
    { x: 5, y: 2, color: 'blue' },
    { x: 5, y: 3, color: 'blue' },
    { x: 5, y: 4, color: 'blue' },
    { x: 5, y: 5, color: 'blue' },

];
function Board ({ isTurn }){


    const { selectedCards, handlerSelectedCard } = useSelectedCards(isTurn);

    return (
        <div className="Board">
            <div className="BoxCards">
                {cardData.map(({ x, y, color }) => {
                        const index = `${x}-${y}`;
                        return (
                            <BoxCard
                                key={index}
                                color={color}
                                isSelected={selectedCards.includes(index)}
                                onClick={() => handlerSelectedCard(x, y)}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default Board;