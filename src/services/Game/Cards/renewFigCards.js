import { useState, useEffect, useCallback } from "react";
import { GET_FIGURES_URL } from "../../../utils/Constants.js";

function renewFigCards(playerId) {
  const [fig_cards, setFigCards] = useState([]);

  const fetchFigs = useCallback(async () => {
    try {
      const response = await fetch(GET_FIGURES_URL + playerId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las cartas de figuras del jugador.");
      }
      const data = await response.json();
      //console.log("Figuras: ", data.id_fig_card);
      setFigCards(data.fig_cards);
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

  return { fig_cards, fetchFigs };
}
export default renewFigCards;
