import "./Board.css";
import BoxCard from "./BoxCard/BoxCard";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";
import getFormedFig from "../../../services/Game/Board/Highlight Figs/formedFig";
import { COLORMAP_BOXCARDS } from "../../../utils/Constants";
import { useEffect } from "react";


function Board({ isTurn, cardData, onSelectedCards, game_id}) {
    const { selectedCards, handlerSelectedCard, clearSelectedCards } = useSelectedCards(isTurn);

    const formedFigs  = getFormedFig(game_id); 

    useEffect(() => {
        onSelectedCards(selectedCards);
    }, [selectedCards, onSelectedCards]);

    const isHighlighted = (x, y) => {
        const fig = formedFigs.find(fig => 
            fig.some(pos => pos.x === x && pos.y === y)
        );
        // Si la figura está formada, devuelve el color de la carta correspondiente.
        return fig ? COLORMAP_BOXCARDS[fig.find(pos => pos.x === x && pos.y === y).color] : null;
    };

    return (
        <div className="Board">
          <div className="BoxCards">
              {cardData.map(({ x, y, color }) => {
              const index = `${x}-${y}`;
              const highlightColor = isHighlighted(x, y) ? COLORMAP_BOXCARDS[color] : null;
              const isSelected = selectedCards.some(card => card.x === x && card.y === y);
              return (
                  <BoxCard
                      key={index}
                      color={color}
                      isSelected={isSelected}
                      isHighlighted={!!highlightColor} // Asegúrate de que es un booleano
                      highlightColor={highlightColor}
                      onClick={() => handlerSelectedCard(x, y)}
                  />
              );
              })}
          </div>
        </div>
    );
}

export default Board;
