// import { GET_MOVEMENTS_URL } from "../../utils/Constants.js";
import { useMovUrl } from "./useMovUrl.js";

export const getMovements = async () => {
    const playerId = parseInt(localStorage.getItem("id_user"), 10); 
    const fullUrl = useMovUrl(playerId); 

    try {
        const response = await fetch(fullUrl, {
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
