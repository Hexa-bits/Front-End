import { useFigCardUrl } from "./useFigCardUrl.js";
import { GET_FIGURES_URL } from "../../utils/Constants.js";
// import fetchMock from "fetch-mock";

// const MOCKURL = `${GET_FIGURES_URL}?player_id=43`;
// fetchMock.get(MOCKURL, {id_fig_card: [1,2,3]});


export const getFigureCards = async () => {
    const playerId = parseInt(localStorage.getItem("id_user"), 10);
    const fullUrl = useFigCardUrl(playerId);

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Error al obtener las cartas de movimientos del jugador.");
        }
        const data = await response.json();
        console.log("Figuras: ", data.id_fig_card);
        return { figs_ids: data.id_fig_card || [] };

    } catch (error) {
        console.error("Error al obtener las cartas de movimientos del jugador:", error);
        return { figs_ids: [] };
    }
};
