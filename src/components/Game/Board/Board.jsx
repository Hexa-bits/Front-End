import "./Board.css";
import BoxCard from "./BoxCard/BoxCard";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";
import getFormedFig from "../../../services/Game/Board/HighlightFigs/formedFig";
import { COLORMAP_BOXCARDS } from "../../../utils/Constants";
import { useEffect, useState} from "react";


function Board({ isTurn, cardData, onSelectedCards, onSelectedFig}) {
    const { selectedCards, handlerSelectedCard } = useSelectedCards(isTurn);
    const formedFigs  = getFormedFig(); 

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

    const handleFigSelection = (x, y) => {
        handlerSelectedCard(x, y);
        const foundFig = formedFigs.find(fig => 
          fig.some(pos => pos.x === x && pos.y === y)
        );
        if (foundFig) { onSelectedFig(foundFig); } 
    };

    return (
        <div className="Board">
          <div className="BoxCards">
              {cardData.map(({ x, y, color }) => {
              const index = `${x}-${y}`;
              const highlightColor = isHighlighted(x, y) ? COLORMAP_BOXCARDS[color] : null;
              const isSelected = selectedCards.some(card => card.x === x && card.y === y);
              const inFig = formedFigs.some(fig => fig.some(pos => pos.x === x && pos.y === y));
              return (
                  <BoxCard
                      key={index}
                      color={color}
                      isSelected={isSelected}
                      isHighlighted={!!highlightColor}
                      highlightColor={highlightColor}
                      onClick={inFig 
                        ? () => handleFigSelection(x, y) 
                        : () => handlerSelectedCard(x, y)
                     }
                  />
              );
              })}
          </div>
        </div>
    );
}

export default Board;
