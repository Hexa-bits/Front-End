import React from 'react';
import { render } from '@testing-library/react';
import { useEffect , act} from 'react';
import { useLobby } from '../../hooks/Lobby/useLobby.js';
import { fetchGameInfo } from "../../hooks/Lobby/useFetch.js";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('../../hooks/Lobby/useFetch.js'); 

const TestComponent = ({ lobbyUrl, onRender }) => {
    const lobbyState = useLobby(lobbyUrl);

    useEffect(() => {
        onRender(lobbyState);
    }, [lobbyState]);

    return null; 
};

describe('useLobby', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch game info and set players, gameName, and maxPlayers', async () => {
        fetchGameInfo.mockResolvedValueOnce({
            name_players: [{ username: 'Player1' }, { username: 'Player2' }],
            game_name: 'Mock Game',
            max_players: 4,
        });

        let result = null;

        await act(async () => {
            render(
                <TestComponent 
                    lobbyUrl="mocked-url"
                    onRender={(lobbyState) => (result = lobbyState)} 
                />
            );
        });

        expect(result.players).toEqual([{ username: 'Player1' }, { username: 'Player2' }]);
        expect(result.gameName).toBe('Mock Game');
        expect(result.maxPlayers).toBe(4);
    });
});
