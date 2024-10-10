import { describe, it, vi, expect, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import WinnerExists from "../../hooks/Game/winnerExists";

vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
}));

const gameId = "123";
const GET_WINNER_URL = "/game/winner?game_id=123";

describe("WinnerExists hook", () => {
    let mockFetch;
    let mockWs;

    beforeEach(() => {
        mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    name_player: "Jugador 1",
                }),
            })
        );

        mockWs = {
            onmessage: null,
        }
        global.fetch = mockFetch;

        vi.spyOn(console, "log").mockImplementation(() => {});
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Initializes with default values', () => {
        const { result } = renderHook(() => WinnerExists(mockWs, gameId));
        expect(result.current.winnerName).toBe(null);
    });
    
    it('Handles WebSocket message and fetches winner', async () => {
        const { result } = renderHook(() => WinnerExists(mockWs, gameId));
        act(() => {
            mockWs.onmessage({ data: 'Hay Ganador' });
        });
        waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(GET_WINNER_URL + gameId, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            expect(result.current.winnerName).toBe('Jugador 1');
        });
    });
    
    it('Handles fetch error gracefully', async () => {
        mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));
        const {result} = renderHook(() => WinnerExists(mockWs, gameId));
        act(() => {
            mockWs.onmessage({ data: 'Hay Ganador' });
        });
        waitFor(() => {
            expect(result.current.winnerName).toBe(null);
            expect(console.error).toHaveBeenCalledWith('Error fetching winner:', expect.any(Error));
        });
    });
    it('Se obtiene el ganador correctamente al recibir mensaje de WebSocket', async () => {
        const { result } = renderHook(() => WinnerExists(mockWs, gameId));
        act(() => {
            mockWs.onmessage({ data: 'Hay Ganador' });
        });
        waitFor(() => {
            expect(result.current.winnerName).toBe('Jugador 1');
        });
    });
});