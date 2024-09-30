import React from "react";
import { GAME_PASS_URL } from "../../utils/Constants";

export const pass = async () => {
  const game_id = localStorage.getItem("game_id");
  try {
    const response = await fetch(GAME_PASS_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id }),
    });

    if (!response.ok) {
      throw new Error("No existe la conexion con el back ");
    }

    alert(`Turno pasado`);
  } catch (error) {
    alert("Error al pasar el turno. " + error.message);
  }
};