import "./Board.css";
import BoxCard from "./BoxCard/BoxCard";
import useSelectedCards from "../../../utils/logics/Game/Board/useSelectedCards";
import { useState } from "react";
import { GAME_BOARD_URL } from "../../../utils/Constants";

function Board({ isTurn }) {
  const [boxCards, setBoxCards] = useState([]);
  const fetchCards = async () => {
    const gameId = parseInt(localStorage.getItem("game_id"));
    try {
      const response = await fetch(GAME_BOARD_URL + gameId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las fichas del juego.");
      }
      const data = await response.json(); //fichas: [ { x: int, y: int, color: int} ]
      //const colors = data.fichas.map((ficha) => ficha.color);
      setBoxCards(data.fichas.color);
      console.log("Colores: ", colors);
    } catch (error) {
      console.error("Error al obtener las fichas:", error);
    }
  };

  //A modo de Ejemplo
  const boxCcards = [
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
