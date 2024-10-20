import { waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import discardMove  from "../../services/Game/Cards/discardMove";
import { USE_MOV_CARD } from "../../utils/Constants";

const playerId = 2;
const selectedMov = { id: 20 , move: 2};
const selectedCards = [ {x_pos: 1, y_pos:2 }, {x_pos: 5, y_pos:2}];
const fichas = selectedCards.map((card) => {
    return { x_pos: card.x, y_pos: card.y };
});

global.fetch = vi.fn();

describe("discardFig", () => {
    let mockFetch;
    let consoleLogSpy;
    let consoleErrorSpy;

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

    it("deberia hacer la llamada para usar la carta correctamente", async () => {
        await discardMove(playerId, selectedMov, selectedCards);
        expect(mockFetch).toHaveBeenCalledWith(USE_MOV_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                id_mov_card: selectedMov.id,
                fichas: fichas,
            }),
        });
        expect(console.log).toHaveBeenCalledWith("Movimiento realizado con exito");
    });

    it("Deberia manejar codigos de error de la llamada", async () => {
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 400,
            })
        );
        await discardMove(playerId, selectedMov, selectedCards);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Movimiento no valido");  //modif
        });
        
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 500,
            })
        );
        await discardMove(playerId, selectedMov, selectedCards);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Fallo en la base de datos");
        });

        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 422,
            })
        );
        await discardMove(playerId, selectedMov, selectedCards);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Error al usar movimiento");
        });
    });  
});