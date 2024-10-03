import '@testing-library/jest-dom';
import React from 'react';
import Home from '../../containers/App/components/Home/Home';
import useGames from '../../hooks/Home/useGames';
import { useHomeLogic } from '../../utils/logics/Home/LogicJoinGame';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/Home/useGames');
vi.mock('../../utils/logics/Home/LogicJoinGame');

describe('Home', () => {
  const mockGames = [
    { game_id: "1", game_name: "Juego 1", current_players: 1, max_players: 4 },
    { game_id: "2", game_name: "Juego 2", current_players: 2, max_players: 4 },
    { game_id: "3", game_name: "Juego 3", current_players: 3, max_players: 4 },
    { game_id: "4", game_name: "Juego 4", current_players: 4, max_players: 4 }
  ];

  let mockHandleJoin;

  beforeEach(() => {
    // Mock para useGames
    useGames.mockReturnValue({
      games: mockGames,
    });

    // Mock para useHomeLogic
    mockHandleJoin = vi.fn((id) => {
      const game = mockGames.find(game => game.game_id === id);
      if (game && game.current_players < game.max_players) {
        game.current_players += 1; // Simular el incremento de jugadores
      }
    });
    useHomeLogic.mockReturnValue({
      handleJoin: mockHandleJoin,
    });
  });

  it('debe mostrar la lista de juegos', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que los nombres de los juegos se muestren
    expect(screen.getByText('Juego 1')).toBeInTheDocument();
    expect(screen.getByText('Juego 2')).toBeInTheDocument();
    expect(screen.getByText('Juego 3')).toBeInTheDocument();
    expect(screen.getByText('Juego 4')).toBeInTheDocument();
  });

  it('debe llamar a handleJoin cuando se hace clic en el botón "Unirse"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Encuentra el botón "Unirse" para el primer juego y simula un clic
    const joinButton = screen.getAllByText('Unirse')[0]; // Obtener el primer botón "Unirse"
    fireEvent.click(joinButton);

    // Verifica que handleJoin haya sido llamado con el id del juego correspondiente
    expect(mockHandleJoin).toHaveBeenCalledWith("1");
  });

  it('debe deshabilitar el botón "Unirse" si el juego está lleno', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Encuentra el botón "Unirse" para el juego lleno (Juego 4 en este caso)
    const fullJoinButton = screen.getAllByText('Unirse')[3]; // Obtener el botón para el juego 4
    expect(fullJoinButton).toBeDisabled(); // Verifica que el botón esté deshabilitado
  });
});