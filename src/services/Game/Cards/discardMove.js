import { USE_MOV_CARD  } from "../../../utils/Constants";

const discardMove = async ( playerId, selectedMov, selectedCards ) => {
    
    const card_id = parseInt(selectedMov.id, 10);
    const fichas = selectedCards.map((card) => {
        return { x_pos: card.x, y_pos: card.y };
    });

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
                console.log("Movimiento no valido");
            }
            else if (response.status === 500) {
                console.log("Fallo en la base de datos");
            }
            else {
                console.log("Error al usar movimiento");
            }
            return false;
        }
        console.log("Movimiento realizado con exito");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default discardMove;