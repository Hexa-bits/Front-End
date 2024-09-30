import React from "react";
import { GAME_PASS_URL } from "../../utils/Constants";

const game_id = localStorage.getItem("game_id");

export const leave = async () => {
  try {
    const response = await fetch(GAME_PASS_URL, {
      method: "PUT", //esta función responde al async de handleclick
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id }), //creo que acá debería mandar tambien el id del owner
    });

    if (!response.ok) {
      throw new Error("No existe la conexion con el back ");
    }

    alert(`Turno pasado`);
  } catch (error) {
    alert("Error al pasar el turno. " + error.message);
  }
};
