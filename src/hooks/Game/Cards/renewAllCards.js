import { useState, useEffect, useCallback } from "react";
import {
  GET_MOVEMENTS_URL,
  GET_FIGURES_URL,
} from "../../../utils/Constants.js";

function renewAllCards(playerId) {
  const [movs_ids, setMovsIds] = useState([]);
  const [figs_ids, setFigsIds] = useState([]);
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
      console.log("Movimientos: ", data.id_mov_card);
      setMovsIds(data.id_mov_card);
    } catch (error) {
      console.error(
        "Error al obtener las cartas de movimientos del jugador:",
        error
      );
    }
  }, [playerId]);

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
    fetchMovs();
  }, [fetchFigs, fetchMovs]);

  return { movs_ids, figs_ids, fetchFigs, fetchMovs };
}
export default renewAllCards;
