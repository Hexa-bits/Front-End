import { useState, useEffect, useCallback } from "react";
import { GET_FIGURES_URL } from "../../../utils/Constants.js";

function renewFigCards(playerId) {
  const [fig_cards, setFigCards] = useState([]);
  const [fig_cant, setFigCant] = useState(0);

  const fetchFigs = useCallback(async () => {
    try {
      const response = await fetch(GET_FIGURES_URL + playerId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las cartas de figuras del jugador.");
      }
      const data = await response.json();
      console.log("Figuras: ", data);
      setFigCards(data.fig_cards);
      setFigCant(data.fig_cant);
    } catch (error) {
      console.error(
        "Error al obtener las cartas de figuras del jugador:",
        error
      );
    }
  }, [playerId]);

  useEffect(() => {
    fetchFigs();
  }, [fetchFigs]);

  return { fig_cards, fig_cant, fetchFigs };
}
export default renewFigCards;
