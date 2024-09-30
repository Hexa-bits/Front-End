import { render, act } from '@testing-library/react';
import { useLobby } from "../../hooks/Lobby/useLobby.js";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { useNavigate } from 'react-router-dom';
import { GAME } from '../../utils/Constants.js';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            name_players: ['Player1', 'Player2'],
            game_name: 'Test Game',
            max_players: 4,
            game_status: false, // Estado inicial del juego inactivo
        }),
    })
);

beforeAll(() => {
    global.localStorage = {
        setItem: jest.fn(),
    };
});

afterAll(() => {
    jest.clearAllMocks();
});

const TestComponent = ({ url, gameId }) => {
    const { players, gameName, maxPlayers, activeGame } = useLobby(url, gameId);
    return (
        <div>
            <div data-testid="players">{players.join(', ')}</div>
            <div data-testid="gameName">{gameName}</div>
            <div data-testid="maxPlayers">{maxPlayers}</div>
            <div data-testid="activeGame">{activeGame ? 'Active' : 'Inactive'}</div>
        </div>
    );
};

describe('useLobby Hook', () => {
    it('should fetch and return game data when game is inactive', async () => {
        let getByTestId;
        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        expect(getByTestId('players').textContent).toBe('Player1, Player2');
        expect(getByTestId('gameName').textContent).toBe('Test Game');
        expect(getByTestId('maxPlayers').textContent).toBe('4');
        expect(getByTestId('activeGame').textContent).toBe('Inactive');
    });

    it('should navigate to GAME and update localStorage when game becomes active', async () => {
        // Simula que el estado del juego ha cambiado a activo
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                name_players: ['Player1', 'Player2'],
                game_name: 'Test Game',
                max_players: 4,
                game_status: true, // El juego ha comenzado
            }),
        }));

        const navigate = useNavigate();
        let getByTestId;
        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        expect(getByTestId('activeGame').textContent).toBe('Active');
        expect(navigate).toHaveBeenCalledWith(GAME); // Verifica la navegación
        expect(localStorage.setItem).toHaveBeenCalledWith('active', true); // Verifica que el valor se guardó en localStorage
    });

    it('should handle fetch errors', async () => {
        // Simula un error en la llamada fetch
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

        let getByTestId;
        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        expect(getByTestId('players').textContent).toBe(''); // Lista de jugadores vacía
        expect(getByTestId('gameName').textContent).toBe(''); // Nombre del juego vacío
        expect(getByTestId('maxPlayers').textContent).toBe('0'); // Valor inicial de maxPlayers
        expect(getByTestId('activeGame').textContent).toBe('Inactive'); // Juego inactivo por defecto
    });
});
