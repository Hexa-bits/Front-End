import { USE_MOV_CARD  } from "../../../utils/Constants";

const useMovCard = async ( playerId, cardId, boxCards ) => {
    
    try {
        const response = await fetch(USE_MOV_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                card_id: cardId,
                fichas : boxCards
            }),
        });
        if (!response.ok) {
            throw new Error("Fallo envio de datos");
        }
    } catch (error) {
        console.error("Error al usar movimiento:", error);
    }
}

export default useMovCard;