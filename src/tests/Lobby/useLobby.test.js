// Test: useLobby Hook
import React from 'react';
import { render, act } from '@testing-library/react';
import { useLobby } from "../../hooks/Lobby/useLobby.js";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            name_players: ['Player1', 'Player2'],
            game_name: 'Test Game',
            max_players: 4,
        }),
    })
);

beforeAll(() => {
    global.alert = jest.fn();
});

afterAll(() => {
    global.alert.mockRestore();
});

const TestComponent = ({ url }) => {
    const { players, gameName, maxPlayers } = useLobby(url);
    return (
        <div>
            <div data-testid="players">{players.join(', ')}</div>
            <div data-testid="gameName">{gameName}</div>
            <div data-testid="maxPlayers">{maxPlayers}</div>
        </div>
    );
};

describe('useLobby Hook', () => {
    it('should fetch and return game data', async () => {
        let getByTestId;
        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" />));
        });

        expect(getByTestId('players').textContent).toBe('Player1, Player2');
        expect(getByTestId('gameName').textContent).toBe('Test Game');
        expect(getByTestId('maxPlayers').textContent).toBe('4');
    });

    it('should handle fetch errors', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

        let getByTestId;
        await act(async () => {
            ({ getByTestId } = render(<TestComponent url="mockFullUrl" />));
        });

        expect(getByTestId('players').textContent).toBe(''); // Empty players due to error
        expect(getByTestId('gameName').textContent).toBe(''); // Default gameName due to error
        expect(getByTestId('maxPlayers').textContent).toBe('0'); // Default maxPlayers due to error
    });
});