import { waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";
import discardFig  from "../../services/Game/Cards/discardFig";
import { USE_FIG_CARD } from "../../utils/Constants";

const playerId = 1;
const selectedFig = [ {x: 1, y:2 }, {x:2, y: 2}, {x:3, y:2}];
const selectedFigCard = { id: 10 , fig: 3};


global.fetch = vi.fn();

describe("discardFig", () => {
    let mockFetch;
    let consoleLogSpy;

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
        await discardFig(playerId, selectedFig, selectedFigCard);
        expect(mockFetch).toHaveBeenCalledWith(USE_FIG_CARD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                id_fig_card: selectedFigCard.id,
                fichas: selectedFig,
            }),
        });
        expect(console.log).toHaveBeenCalledWith("Carta Figura descartada con exito.");
    });

    it("Deberia manejar codigos de error de la llamada", async () => {
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 400,
            })
        );
        await discardFig(playerId, selectedFig, selectedFigCard);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Carta no coincide con figura seleccionada");  //modif
        });
        
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 500,
            })
        );
        await discardFig(playerId, selectedFig, selectedFigCard);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Fallo en la base de datos");
        });

        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
              status: 422,
            })
        );
        await discardFig(playerId, selectedFig, selectedFigCard);
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Error al descartar");
        });
        
    });
});