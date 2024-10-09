import { useEffect } from "react";
import { GET_MOVEMENTS_URL, GET_FIGURES_URL } from "../../utils/Constants.js";

function renewAllCards(ws, playerId) {
  //esta funcion va a recibir x ws q tiene q renovar cartas del jugador x
  //nO TENGO QUE TENER UNA VARIABLE USESTATE, NO?
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
      return { movs_ids: data.id_mov_card || [] };
    } catch (error) {
      console.error(
        "Error al obtener las cartas de movimientos del jugador:",
        error
      );
      return { movs_ids: [] };
    }
  };

  const renewFigs = async () => {
    try {
      //puedo poner dos try? o si o si tengo que pedir las cartas de figura en su propio archivo?
      const response = await fetch(GET_FIGURES_URL + playerId, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las cartas de figuras del jugador.");
      }
      const data = await response.json();
      console.log("Figuras: ", data.id_fig_card);
      return { figs_ids: data.id_fig_card || [] };
    } catch (error) {
      console.error(
        "Error al obtener las cartas de figuras del jugador:",
        error
      );
      return { figs_ids: [] };
    }
  };

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
  }, [ws]); //por qué ws?
  return { renewMovs, renewFigs };
}
export default renewAllCards;
