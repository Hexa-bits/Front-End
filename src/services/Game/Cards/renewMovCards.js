import { useState, useEffect, useCallback } from "react";
import { GET_MOVEMENTS_URL } from "../../../utils/Constants.js";

function renewMovCards(playerId) {
  const [mov_cards, setMovCards] = useState([]);
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
      // console.log(
      //   "Movimientos: ",
      //   data.mov_cards.map((card) => card.move)
      // );
      setMovCards(data.mov_cards);
    } catch (error) {
      console.error(
        "Error al obtener las cartas de movimientos del jugador:",
        error
      );
    }
  }, [playerId]);

  useEffect(() => {
    fetchMovs();
  }, [fetchMovs]);

  return { mov_cards, fetchMovs };
}
export default renewMovCards;
