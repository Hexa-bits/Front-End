import { render, screen, fireEvent } from '@testing-library/react';
import ConfigGame from "../../components/ConfigGame/ConfigGame";
import React from 'react';

describe('ConfigGame Component', () => {
  test('Debe renderizar el componente ConfigGame.', () => {
    const setPlayerAmnt = vi.fn();
    const handleOnChange = vi.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={0} setPlayerAmnt={setPlayerAmnt} />);

    expect(screen.getByLabelText('Nombre de la partida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese un nombre')).toBeInTheDocument();
    expect(screen.getByText('Elige la cantidad de participantes')).toBeInTheDocument();
  });

  test('Debe llamar setPlayerAmnt al seleccionar la cantidad de jugadores.', () => {
    const setPlayerAmnt = vi.fn();
    const handleOnChange = vi.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={0} setPlayerAmnt={setPlayerAmnt} />);

    fireEvent.click(screen.getByText('2'));
    expect(setPlayerAmnt).toHaveBeenCalledWith(2);
  });

  test('Debe mostrar la cantidad de jugadores seleccionados.', () => {
    const setPlayerAmnt = vi.fn();
    const handleOnChange = vi.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={3} setPlayerAmnt={setPlayerAmnt} />);
    
    expect(screen.getByTestId('player-count')).toHaveTextContent('Participantes: 3');
  });
});
