import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigGame from "../../components/ConfigGame/ConfigGame";

describe('ConfigGame Component', () => {
  test('debe renderizar el componente ConfigGame', () => {
    const setPlayerAmnt = jest.fn();
    const handleOnChange = jest.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={0} setPlayerAmnt={setPlayerAmnt} />);

    expect(screen.getByLabelText('Nombre de la partida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese un nombre')).toBeInTheDocument();
    expect(screen.getByText('Elige la cantidad de participantes')).toBeInTheDocument();
  });

  test('debe llamar setPlayerAmnt al seleccionar la cantidad de jugadores', () => {
    const setPlayerAmnt = jest.fn();
    const handleOnChange = jest.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={0} setPlayerAmnt={setPlayerAmnt} />);

    fireEvent.click(screen.getByText('2'));
    expect(setPlayerAmnt).toHaveBeenCalledWith(2);
  });

  test('debe mostrar la cantidad de jugadores seleccionados', () => {
    const setPlayerAmnt = jest.fn();
    const handleOnChange = jest.fn();
    render(<ConfigGame handleOnChange={handleOnChange} maxPlayers={3} setPlayerAmnt={setPlayerAmnt} />);
    
    expect(screen.getByTestId('player-count')).toHaveTextContent('Participantes: 3');
  });
});
