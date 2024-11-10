import { USE_FIG_CARD } from "../../../utils/Constants";

const discardFig = async (playerId, selectedFig, selectedFigCard) => {
  const fig_card_id = parseInt(selectedFigCard.id, 10);
  const fichas = selectedFig.map((card) => {
    return { x_pos: card.x, y_pos: card.y };
  });

  try {
    const response = await fetch(USE_FIG_CARD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id: playerId,
        id_fig_card: fig_card_id,
        figura: fichas,
      }),
    });
    if (!response.ok) {
      switch (response.status) {
        case 400:
          console.log("Carta no coincide con figura seleccionada");
          break;
        case 500:
          console.log("Fallo en la base de datos");
          break;
        default:
          console.log("Error al descartar");
          break;
      }
      return false;
    }
    else {
      console.log("Carta Figura descartada con exito.");
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default discardFig;
