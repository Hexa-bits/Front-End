import { GET_MOVEMENTS_URL } from "../../utils/Constants.js";
import { useMovUrl } from "./useMovUrl.js";

import fetchMock from "fetch-mock";
const MOCKURL = `${GET_MOVEMENTS_URL}?player_id=5`;
fetchMock.get(MOCKURL, {id_mov_card: [1, 3, 3]});


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
        return { cards_ids: data.id_mov_card || [] };  

    } catch (error) {
        console.error("Error al obtener las cartas de movimientos del jugador:", error);
        return { cards_ids: [] };  
    }
};
