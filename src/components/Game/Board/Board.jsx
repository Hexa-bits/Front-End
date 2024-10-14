import "./Board.css";
import BoxCard from "./BoxCard/BoxCard";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";
import { useEffect } from "react";

function Board({ isTurn, cardData, onSelectedCards}) {
  const { selectedCards, handlerSelectedCard } = useSelectedCards(isTurn);
  
  useEffect(() => {
    onSelectedCards(selectedCards);
  }, [selectedCards, onSelectedCards]);
  
  return (
    <div className="Board">
      <div className="BoxCards">
        {cardData.map(({ x, y, color }) => {
          const index = `${x}-${y}`;
          const isSelected = selectedCards.some(card => card.x === x && card.y === y);
          return (
            <BoxCard
              key={index}
              color={color}
              isSelected={isSelected}
              onClick={() => handlerSelectedCard(x, y, color)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
