import { useState, useEffect, useCallback } from "react";
import {
  GET_MOVEMENTS_URL,
  GET_FIGURES_URL,
} from "../../../utils/Constants.js";

function renewAllCards(playerId) {
  const [mov_cards, setMovCards] = useState([]);
  const [fig_cards, setFigCards] = useState([]);

  const mockFigCards = [
    { id: 1, fig: 1 },
    { id: 2, fig: 2 },
    { id: 3, fig: 3 },
  ];
  const mockMovCards = [
    { id: 1, move: 1 },
    { id: 2, move: 2 },
    { id: 3, move: 3 },
  ];

  const fetchMovs = useCallback(async () => {
    try {
      const response = await fetch(GET_MOVEMENTS_URL + playerId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          "Error al obtener las cartas de movimientos del jugador."
        );
      }
      const data = await response.json();
      // console.log("Movimientos: ", data.mov_cards.map((card) => card.move));
      setMovCards(data.mov_cards);
    } catch (error) {
      console.error(
        "Error al obtener las cartas de movimientos del jugador:",
        error
      );
    }
  }, [playerId]);

  const fetchFigs = useCallback(async () => {
    try {
      // const response = await fetch(GET_FIGURES_URL + playerId, {
      //   method: "GET",
      // });

      // if (!response.ok) {
      //   throw new Error("Error al obtener las cartas de figuras del jugador.");
      // }
      // const data = await response.json();
      // // console.log("Movimientos: ", data.fig_cards.map((card) => card.fig));

      // setFigCards(data.fig_cards);
         setFigCards(mockFigCards);
    } catch (error) {
      console.error(
        "Error al obtener las cartas de figuras del jugador:",
        error
      );
    }
  }, [playerId]);

  useEffect(() => {
    fetchFigs();
    fetchMovs();
  }, [fetchFigs, fetchMovs]);

  return { mov_cards, fig_cards, fetchFigs, fetchMovs };
}
export default renewAllCards;
