import getOthersInfo from "../../services/Game/Cards/getOthersInfo";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";

const playerId = 1;
const gameId = 2;

const url = `game_id=${gameId}&player_id=${playerId}`;

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
        
        waitFor(() => {
            expect(mockPlayers).toHaveBeenCalledWith(url, { method: "GET", });
            expect(result.current.infoPlayers).toEqual([
                {
                    nombre: "Player1", 
                    fig_cards: [
                        {id: 1, fig: 4},
                        {id: 2, fig: 5},
                        {id: 3, fig: 6}
                    ], 
                    mov_cant: 1
                },
                {
                    nombre: "Player2", 
                    fig_cards: [
                        {id: 4, fig: 7},
                        {id: 5, fig: 8},
                        {id: 6, fig: 9}
                    ], 
                    mov_cant: 3
                }
            ]);
        });
    });

    it ("Handles fetch error gracefully", async () => {
        mockPlayers = vi.fn(() => 
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "Error al obtener la información de los otros jugadores." }),
            })
        );

        global.fetch = mockPlayers;

        const { result } = renderHook(() => getOthersInfo(gameId, playerId));
        const { fetchInfoPlayers } = result.current;
        await fetchInfoPlayers();

        waitFor(() => {
            expect(mockPlayers).toHaveBeenCalledWith(url, { method: "GET", });
            expect().toHaveBeenCalledWith("Error al obtener la información de los otros jugadores.");
        });
    });

});