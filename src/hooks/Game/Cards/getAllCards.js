import { useState, useEffect } from "react";
import {
  GET_MOVEMENTS_URL,
  GET_FIGURES_URL,
} from "../../../utils/Constants.js";

function renewAllCards(ws, playerId) {
  const [movs_ids, setMovsIds] = useState([]);
  const [figs_ids, setFigsIds] = useState([]);
  const renewMovs = async () => {
    try {
      //puedo poner dos try? o si o si tengo que pedir las cartas de figura en su propio archivo?
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
  };

  const renewFigs = async () => {
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
  };
  useEffect(() => {
    renewFigs();
    renewMovs();
  }, [playerId]);

  useEffect(() => {
    if (!ws) return; //si el ws no está abierto no hace nada
    ws.onmessage = (event) => {
      const message = event.data; //acá el mje va a ser sacado de lo q me manda el evento
      if (message === "Terminó turno") {
        renewFigs();
        renewMovs(); // si el ws sí está abierto, llamo a la función q quiero el mje q me llegue
      }
    };
    ws.onerror = (error) => {
      console.error("ws error:", error);
    };
  }, [ws]);
  return { movs_ids, figs_ids };
}
export default renewAllCards;
