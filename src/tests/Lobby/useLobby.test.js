import React from 'react';
import { render, act } from '@testing-library/react';
import { useLobby } from "../../hooks/Lobby/useLobby.js";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { useNavigate } from 'react-router-dom'; // Mock de useNavigate

// Mock de useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(), // Mock de useNavigate
}));

// Mock global de fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            name_players: ['Player1', 'Player2'],
            game_name: 'Test Game',
            max_players: 4,
            game_status: false, // El estado inicial del juego es inactivo
        }),
    })
);

// Mock de alert para evitar interrupciones en los tests
beforeAll(() => {
    global.alert = jest.fn();
});

afterAll(() => {
    global.alert.mockRestore();
});

// Componente de prueba
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
            // Renderiza el componente y captura los elementos testados
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        // Verificaciones
        expect(getByTestId('players').textContent).toBe('Player1, Player2'); // Verifica los jugadores
        expect(getByTestId('gameName').textContent).toBe('Test Game'); // Verifica el nombre del juego
        expect(getByTestId('maxPlayers').textContent).toBe('4'); // Verifica el máximo de jugadores
        expect(getByTestId('activeGame').textContent).toBe('Inactive'); // Verifica que el juego esté inactivo
    });

    it('should navigate to GAME when game is active', async () => {
        // Simula que el estado del juego cambia a activo
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                name_players: ['Player1', 'Player2'],
                game_name: 'Test Game',
                max_players: 4,
                game_status: true, // El juego está activo
            }),
        }));

        const navigate = useNavigate();
        let getByTestId;

        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        // Verifica que el estado cambió a activo
        expect(getByTestId('activeGame').textContent).toBe('Active');
        expect(navigate).toHaveBeenCalledWith(GAME); // Verifica que se navegue a la vista del juego
    });

    it('should handle fetch errors', async () => {
        // Simula un error en la llamada a fetch
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

        let getByTestId;

        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" gameId={1} />));
        });

        // Verifica que, en caso de error, los valores estén vacíos
        expect(getByTestId('players').textContent).toBe(''); 
        expect(getByTestId('gameName').textContent).toBe(''); 
        expect(getByTestId('maxPlayers').textContent).toBe('0'); 
        expect(getByTestId('activeGame').textContent).toBe('Inactive'); 
    });
});
