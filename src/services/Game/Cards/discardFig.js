import { USE_FIG_CARD } from "../../../utils/Constants";

const discardFig = async ( playerId, selectedFig, selectedFigCard ) => {
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
                console.log("Carta no coincide con figura seleccionada");
            }
            else if (response.status === 500) {
                console.log("Fallo en la base de datos");
            }
            else {
                console.log("Error al descartar");
            }
        }
        console.log("Carta Figura descartada con exito.");
    } catch (error) {
        console.log(error);
    }
}

export default discardFig;