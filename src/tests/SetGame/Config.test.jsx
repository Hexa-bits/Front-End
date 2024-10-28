import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test} from "vitest";
import ConfigGame from "../../components/ConfigGame/ConfigGame";
import React from 'react';

describe('ConfigGame Component', () => {
  const handleName = vi.fn();
  const handlePassword = vi.fn();
  const setPlayerAmnt = vi.fn();
    
  test('Debe renderizar el componente ConfigGame.', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword}
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );

    expect(screen.getByLabelText('NOMBRE DE PARTIDA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese un nombre')).toBeInTheDocument();
    expect(screen.getByText('Partida privada')).toBeInTheDocument();
    expect(screen.getByText('Elige la cantidad de participantes')).toBeInTheDocument();
  });

  test('Debe mostrar el nombre ingresado', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    const nameInput = screen.getByPlaceholderText("Ingrese un nombre");
    expect(nameInput).toBeInTheDocument();
  });

  test('Muestra campo de contrasena al clickear checkBox', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    const privateCheckbox = screen.getByLabelText("Partida privada");
    fireEvent.click(privateCheckbox);
    expect(screen.getByPlaceholderText("Ingresar contraseña")).toBeInTheDocument();
  });

  test('Se actualiza la entrada de', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    const privateCheckbox = screen.getByLabelText("Partida privada");
    fireEvent.click(privateCheckbox);
    const passwordInput = screen.getByPlaceholderText("Ingresar contraseña");
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    expect(handlePassword).toHaveBeenCalled();
  });

  test('Se muestran los botones de seleccion de cantidad de jugadores', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
  
  test('Debe mostrar la cantidad de jugadores seleccionados.', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={3} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    expect(screen.getByTestId('player-count')).toHaveTextContent('Participantes: 3');
  });

  test('Se actualiza la seleccion de maxPlayers.', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
      />
    );
    const buttonTwoPlayers = screen.getByText("2");
    fireEvent.click(buttonTwoPlayers);
    expect(setPlayerAmnt).toHaveBeenCalledWith(2);
    expect(buttonTwoPlayers).toHaveClass("selected");
  });
});