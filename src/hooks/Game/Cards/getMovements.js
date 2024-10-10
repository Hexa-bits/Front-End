import { GET_MOVEMENTS_URL } from "../../../utils/Constants";

const getMovements = async (playerId) => {
    try {
        const response = await fetch(GET_MOVEMENTS_URL + playerId, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Error al obtener las cartas de movimientos del jugador.");
        }
        const data = await response.json();
        console.log("Movimientos: ", data.id_mov_card)
        return { movs_ids: data.id_mov_card || [] };  

    } catch (error) {
        console.error("Error al obtener las cartas de movimientos del jugador:", error);
        return { movs_ids: [] };  
    }
};

export default getMovements;