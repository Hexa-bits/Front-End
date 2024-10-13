import "./Board.css";
import BoxCard from "./BoxCard/BoxCard";
import useSelectedCards from "../../../services/Game/Board/useSelectedCards";
import getFormedFig from "../../../services/Game/Board/Highlight Figs/formedFig";
import { COLORMAP_BOXCARDS } from "../../../utils/Constants";
import { useEffect } from "react";

//Modificar este mock
const formedFigs = [
    [{x:1, y:1, color:3}, {x:2, y:1, color:3}, {x:3, y:1, color:3}, {x:2, y:2, color:3}],
    [{x:5, y:3, color:1}, {x:6, y:3, color:1}, {x:6, y:4, color:1}, {x:6, y:5, color:1}]
]

function Board({ isTurn, cardData, onSelectedCards}) {
    const { selectedCards, handlerSelectedCard } = useSelectedCards(isTurn);
    const game_id = localStorage.getItem("game_id");
    console.log("Game ID: ", game_id);

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
            return (
                <BoxCard
                    key={index}
                    color={color}
                    isSelected={selectedCards.includes(index)}
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
