import './Board.css';
import BoxCard from './BoxCard/BoxCard';
import useSelectedCards from '../../../hooks/Game/Board/useSelectedCards';

function Board ({ isTurn }){

    //A modo de Ejemplo
    const boxCards = [
        ["red", "yellow", "green", "blue", "red", "yellow"],
        ["green", "blue", "red", "yellow", "green", "blue"],
        ["yellow", "green", "blue", "red", "yellow", "green"],
        ["blue", "red", "yellow", "green", "blue", "red"],
        ["red", "yellow", "green", "blue", "red", "yellow"],
        ["green", "blue", "red", "yellow", "green", "blue"],
    ];

    const { selectedCards, handlerSelectedCard } = useSelectedCards(isTurn);

    return (
        <div className="Board">
            <div className="BoxCards">
                {boxCards.map((row, rowIndex) => (
                    <div key={rowIndex} className="BoardRow">
                        {row.map((color, colIndex) => {
                            const index = `${rowIndex}-${colIndex}`;
                            return (
                                <BoxCard
                                    key={colIndex}
                                    color={color}
                                    isSelected={selectedCards.includes(index)}
                                    onClick={() => handlerSelectedCard(rowIndex, colIndex)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;