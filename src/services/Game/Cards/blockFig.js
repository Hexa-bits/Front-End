import { BLOCK_FIG_CARD } from "../../../utils/Constants";

const blockFig = async (playerId, otherPlayerId, selectedFig, selectedFigCard) => {
    const otherId = parseInt(otherPlayerId, 10);
    const fig_card_id = parseInt(selectedFigCard.id, 10);
    const boxCards = selectedFig.map((card) => {
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
                other_player_id: otherId,
                id_fig_card: fig_card_id,
                figura: boxCards,
            }),
        });
        if (!response.ok) {
            console.log("Response was not ok.");
        }

    } catch (error) {
        console.log(error);
    }
};

export default blockFig;
