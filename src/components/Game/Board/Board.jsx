import './Board.css';
import BoxCard from './BoxCard/BoxCard';
import useSelectedCards from '../../../hooks/Game/Board/useSelectedCards';

function Board ({ isTurn , cardData }){

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