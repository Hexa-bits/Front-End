import { useState, useEffect, useCallback } from "react";
import { GET_FIGURES_URL } from "../../../utils/Constants.js";

function renewFigCards(playerId) {
  const [figs_ids, setFigsIds] = useState([]);

  const fetchFigs = useCallback(async () => {
    try {
      const response = await fetch(GET_FIGURES_URL + playerId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las cartas de figuras del jugador.");
      }
      const data = await response.json();
      console.log("Figuras: ", data.id_fig_card);
      setFigsIds(data.id_fig_card);
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

  return { figs_ids, fetchFigs };
}
export default renewFigCards;
