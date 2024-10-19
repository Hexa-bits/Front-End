import getOthersInfo from "../../services/Game/Cards/getOthersInfo";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";

const playerId = 1;
const gameId = 2;

describe ("getOthersInfo", () => {
    let mockPlayers;

    beforeEach(() => {
        mockPlayers = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    0: {
                        nombre: "Player1", 
                        fig_cards: [
                            {id: 1, fig: 4},
                            {id: 2, fig: 5},
                            {id: 3, fig: 6}
                        ], 
                        mov_cant: 1
                    },
                    1: {
                        nombre: "Player2", 
                        fig_cards: [
                            {id: 4, fig: 7},
                            {id: 5, fig: 8},
                            {id: 6, fig: 9}
                        ], 
                        mov_cant: 3
                    }
                }),
            })
        );

        global.fetch = mockPlayers;
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("Initializes with default values", () => {
        const { result } = renderHook(() => getOthersInfo(gameId, playerId));
        expect(result.current.infoPlayers).toEqual([]);
    })

});