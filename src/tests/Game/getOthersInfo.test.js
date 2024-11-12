import getOthersInfo from "../../services/Game/Cards/getOthersInfo";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import { GET_PLAYERS_INFO } from "../../utils/Constants";

const playerId = 1;
const gameId = 2;

const url = `${GET_PLAYERS_INFO}game_id=${gameId}&player_id=${playerId}`;

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
                            {id: 1, fig: 4, blocked: false},
                            {id: 2, fig: 5, blocked: true},
                            {id: 3, fig: 6, blocked: false}
                        ], 
                        mov_cant: 1
                    },
                    1: {
                        nombre: "Player2", 
                        fig_cards: [
                            {id: 4, fig: 7, blocked: true},
                            {id: 5, fig: 8, blocked: false},
                            {id: 6, fig: 9, blocked: false}
                        ], 
                        mov_cant: 3
                    }
                }),
            })
        );

        global.fetch = mockPlayers;
        vi.spyOn(console, "log").mockImplementation(() => {});
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("Initializes with default values", () => {
        const { result } = renderHook(() => getOthersInfo(gameId, playerId));
        expect(result.current.infoPlayers).toEqual([]);
    })

    it("Fetches cards correctly", async () => {
        const { result } = renderHook(() => getOthersInfo(gameId, playerId));
        const { fetchInfoPlayers } = result.current;
        await fetchInfoPlayers();
        
        await waitFor(() => {
            expect(mockPlayers).toHaveBeenCalledWith(url, { method: "GET", });
            expect(result.current.infoPlayers).toEqual({
                0: {
                    nombre: "Player1", 
                    fig_cards: [
                        {id: 1, fig: 4, blocked: false},
                        {id: 2, fig: 5, blocked: true},
                        {id: 3, fig: 6, blocked: false}
                    ],
                    mov_cant: 1
                },
                1: {
                    nombre: "Player2", 
                    fig_cards: [
                        {id: 4, fig: 7, blocked: true},
                        {id: 5, fig: 8, blocked: false},
                        {id: 6, fig: 9, blocked: false}
                    ], 
                    mov_cant: 3
                }
            });
        });
    });


    it ("Handles fetch error gracefully", async () => {
        mockPlayers = vi.fn(() => 
            Promise.resolve({
                ok: false,
            })
        );

        global.fetch = mockPlayers;

        const { result } = renderHook(() => getOthersInfo(gameId, playerId));
        const { fetchInfoPlayers } = result.current;
        await fetchInfoPlayers();

        await waitFor(() => {
            expect(mockPlayers).toHaveBeenCalledWith(url, { method: "GET", });
            expect(console.log).toHaveBeenCalledWith("Error en la petición");
        });
    });

});