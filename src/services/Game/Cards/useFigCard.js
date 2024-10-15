import { USE_FIG_CARD } from "../../../utils/Constants";

const useFigCard = async ( playerId, selectedFig, selectedFigCard ) => {
    // if (selectedFig.length > 0 && selectedFig !== null)
    
    const fig_card_id = parseInt(selectedFigCard.id, 10);
    const fichas = selectedFig.map((card) => {
        return { x: card.x, y: card.y };
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
                fichas : fichas
            }),
        });
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Movimiento no valido");
            }
            else if (response.status === 500) {
                throw new Error("Fallo en la base de datos");
            }
            else {
                throw new Error("Error al usar movimiento");
            }
        }
        console.log("Carta Figura usada con exito.");
    } catch (error) {
        console.error("Error al usar movimiento:", error);
    }
}

export default useFigCard;