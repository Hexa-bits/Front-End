import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useSetGame } from '../../../../hooks/Setgame/useSetGame';
import { create } from "../../hooks/Setgame/useCreate";
import { checkInput, checkButtons } from '../../utils/logics/setGame/LogicSetGame';

jest.mock('../../hooks/Setgame/useCreate');
jest.mock('../../utils/logics/setGame/LogicSetGame');

describe('useSetGame Hook', () => {
  beforeEach(() => {
    create.mockImplementation(jest.fn());
    checkInput.mockImplementation(() => true);
    checkButtons.mockImplementation(() => true);
  });

  test('debe inicializar el estado correctamente', () => {
    const { result } = renderHook(() => useSetGame());

    expect(result.current.game_name).toBe('');
    expect(result.current.max_players).toBe(0);
  });

  test('debe llamar a create al hacer clic si los datos son válidos', () => {
    const { result } = renderHook(() => useSetGame());

    act(() => {
      result.current.setGameName('Juego Test');
      result.current.setMaxPlayers(2);
      result.current.handleClick();
    });

    expect(create).toHaveBeenCalledWith('Juego Test', 2, expect.any(Function));
  });

  test('debe mostrar alerta si el nombre es inválido', () => {
    checkInput.mockImplementation(() => false);

    global.alert = jest.fn();
    const { result } = renderHook(() => useSetGame());

    act(() => {
      result.current.setGameName('');
      result.current.setMaxPlayers(2);
      result.current.handleClick();
    });

    expect(global.alert).toHaveBeenCalledWith('Error: el nombre debe tener entre 1 y 10 caracteres.');
  });

  test('debe mostrar alerta si la cantidad de jugadores es inválida', () => {
    checkButtons.mockImplementation(() => false);

    global.alert = jest.fn();
    const { result } = renderHook(() => useSetGame());

    act(() => {
      result.current.setGameName('Juego Test');
      result.current.setMaxPlayers(0);
      result.current.handleClick();
    });

    expect(global.alert).toHaveBeenCalledWith('Error: la cantidad de jugadores es inválida.');
  });
});
