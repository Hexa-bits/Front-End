import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSetGame } from '../../hooks/Setgame/useSetGame'; 
import Start from '../../containers/App/components/SetGame/setGame';

// Mockear el hook useSetGame
jest.mock('../../hooks/Setgame/useSetGame');

describe('Start Component', () => {
  beforeEach(() => {
    useSetGame.mockReturnValue({
      game_name: '',
      setGameName: jest.fn(),
      max_players: 0,
      setMaxPlayers: jest.fn(),
      handleClick: jest.fn(),
    });
  });

  test('debe renderizar el componente Start', () => {
    render(<Start />);
    expect(screen.getByLabelText('Nombre de la partida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese un nombre')).toBeInTheDocument();
    expect(screen.getByText('Elige la cantidad de participantes')).toBeInTheDocument();
    expect(screen.getByText('Crear Partida')).toBeInTheDocument();
  });

  test('debe llamar handleClick al hacer clic en Crear Partida', () => {
    useSetGame.mockReturnValue({
      game_name: 'Juego Test',
      setGameName: jest.fn(),
      max_players: 2,
      setMaxPlayers: jest.fn(),
      handleClick: jest.fn(),
    });

    render(<Start />);
    fireEvent.click(screen.getByText('Crear Partida'));
    
    expect(useSetGame().handleClick).toHaveBeenCalledTimes(1);
  });
});
