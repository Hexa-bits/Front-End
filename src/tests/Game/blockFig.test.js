import { waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import blockFig  from "../../services/Game/Cards/blockFig";
import { BLOCK_FIG_CARD } from "../../utils/Constants";

global.fetch = vi.fn();

describe ("blockFig", () => {
    let mockFetch;
    let consoleLogSpy;
    const playerId = '123';
    const selectedFig = [ {x: 1, y:2 }, {x:2, y: 2}, {x:3, y:2}];
    const selectedFigCard = { id: 10 , fig: 3, blocked: false};

    const boxCards = selectedFig.map((card) => {
        return { x_pos: card.x, y_pos: card.y };
    });

    beforeEach(() => {
        mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = mockFetch;
        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    })

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Sends data correctily to block a fig card.', async () => {
        await blockFig(playerId, selectedFig, selectedFigCard);
        expect(mockFetch).toHaveBeenCalledWith(BLOCK_FIG_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                id_fig_card: selectedFigCard.id,
                figura: boxCards
            }),
        });
        expect(console.log).toHaveBeenCalledWith("Fig card blocked successfully.");
    });

    it('Handles error correctily.', async () => {
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 400,
            })
        );
        await blockFig(playerId, selectedFig, selectedFigCard);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Response was not ok.");
        });

        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 500,
            })
        );
        await blockFig(playerId, selectedFig, selectedFigCard);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Response was not ok.");
        });

    });
});