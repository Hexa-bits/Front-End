import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test} from "vitest";
import ConfigGame from "../../components/ConfigGame/ConfigGame";
import React from 'react';

describe('ConfigGame Component', () => {
  const handleName = vi.fn();
  const handlePassword = vi.fn();
  const setPlayerAmnt = vi.fn();
  const setPrivate = vi.fn();
    
  test('Debe renderizar el componente ConfigGame.', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword}
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={false}
        setPrivate={setPrivate}
      />
    );

    expect(screen.getByLabelText('NOMBRE DE PARTIDA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese un nombre')).toBeInTheDocument();
    expect(screen.getByText('Partida privada')).toBeInTheDocument();
    expect(screen.getByText('ELIGE CANTIDAD DE JUGADORES')).toBeInTheDocument();
  });

  test('Debe mostrar el nombre ingresado', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={false}
        setPrivate={setPrivate}
      />
    );
    const nameInput = screen.getByPlaceholderText("Ingrese un nombre");
    expect(nameInput).toBeInTheDocument();
  });

  test('Se setea partida privada', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={false}
        setPrivate={setPrivate}
      />
    );

    const privateCheckbox = screen.getByLabelText("Partida privada");
    fireEvent.click(privateCheckbox);
    expect(setPrivate).toHaveBeenCalledWith(true);
  });

  test('Se muestra el input de contraseña si la partida es privada', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={true}
        setPrivate={setPrivate}
      />
    );
    expect(screen.getByPlaceholderText("Ingresar contraseña")).toBeInTheDocument();
  });


  test('Se muestran los botones de seleccion de cantidad de jugadores', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={false}
        setPrivate={setPrivate}
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
        isPrivate={false}
        setPrivate={setPrivate}
      />
    );
    expect(screen.getByTestId('player-count')).toHaveTextContent('Jugadores: 3');
  });

  test('Se actualiza la seleccion de maxPlayers.', () => {
    render(
      <ConfigGame 
        handleName={handleName} 
        handlePassword={handlePassword} 
        maxPlayers={0} 
        setPlayerAmnt={setPlayerAmnt} 
        isPrivate={false}
        setPrivate={setPrivate}
      />
    );
    const buttonTwoPlayers = screen.getByText("2");
    fireEvent.click(buttonTwoPlayers);
    expect(setPlayerAmnt).toHaveBeenCalledWith(2);
    expect(buttonTwoPlayers).toHaveClass("selected");
  });
});