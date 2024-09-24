import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../containers/App/components/Home/Home';
import '@testing-library/jest-dom';
import useGames from "../../hooks/Home/useGames";

import { describe, it, expect, jest } from '@jest/globals';


jest.mock('../../hooks/Home/useGames.js'); 

describe('Home', () => {
  const mockGames = [
    { game_id: "1", game_name: "Juego 1", current_players: 1, max_players: 4 },
    { game_id: "2", game_name: "Juego 2", current_players: 2, max_players: 4 },
    { game_id: "3", game_name: "Juego 3", current_players: 3, max_players: 4 },
    { game_id: "4", game_name: "Juego 4", current_players: 4, max_players: 4 }
  ];

  beforeEach(() => {
    useGames.mockReturnValue({
      games: mockGames,
      handleJoin: jest.fn((id) => {
        const game = mockGames.find(game => game.game_id === id);
        if (game && game.current_players < game.max_players) {
          game.current_players += 1;
        }
      }),
    });
  });

  it('debe mostrar la lista de juegos', () => {
    render(<Home />);
    // Verifica que los nombres de los juegos se muestren
    expect(screen.getByText('Juego 1')).toBeInTheDocument();
    expect(screen.getByText('Juego 2')).toBeInTheDocument();
    expect(screen.getByText('Juego 3')).toBeInTheDocument();
    expect(screen.getByText('Juego 4')).toBeInTheDocument();
  });


});
