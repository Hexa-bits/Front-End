import { BLOCK_FIG_CARD } from "../../../utils/Constants";

const blockFig = async (playerId, selecFormedFig, figToBlock) => {
    // console.log(selecFormedFig);
    console.log(figToBlock);
    const fig_card_id = parseInt(figToBlock.id, 10);
    const boxCards = selecFormedFig.map((card) => {
        return { x_pos: card.x, y_pos: card.y };
    });

    try {
        const response = await fetch(BLOCK_FIG_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                id_fig_card: fig_card_id,
                figura: boxCards,
            }),
        });
        if (!response.ok) {
            console.log("Response was not ok.");
        }
        console.log("Carta Figura bloqueada con exito.");
        
    } catch (error) {
        console.log(error);
    }
};

export default blockFig;
