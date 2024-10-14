import { USE_MOV_CARD  } from "../../../utils/Constants";

const useMovCard = async ( playerId, selectedMov, selectedCards ) => {
    
    const fichas = selectedCards.map((card) => {
        console.log("x: " + card.x, "y: " + card.y, "color: " + card.color);
        return { 
            x_pos: card.x, 
            y_pos: card.y, 
            color: card.color 
        };
    });
    const card_id = parseInt(selectedMov.id, 10);

    try {
        const response = await fetch(USE_MOV_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                id_mov_card: card_id,
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
    } catch (error) {
        console.error("Error al usar movimiento:", error);
    }
}

export default useMovCard;