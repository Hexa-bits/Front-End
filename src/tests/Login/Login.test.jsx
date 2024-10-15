import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginHelpText, HOME } from '../../utils/Constants.js';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../containers/App/components/Login/Login.jsx';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Componente de Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Debería mostrar el formulario de logueo.', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('El Switcher')).toBeInTheDocument();
    expect(screen.getByLabelText('Registro de Usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresar nombre de usuario')).toBeInTheDocument();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('Debería actualizar el nombre de usuario al cambiar la entrada.', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ingresar nombre de usuario');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input.value).toBe('testuser');
  });

  it('Debería mostrar una alerta si el nombre de usuario no es válido', () => {
    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const button = screen.getByText('Ingresar');
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Nombre ' + LoginHelpText);
  });

  it('Debe navegar a HOME si el nombre de usuario es válido y ya está guardado.', () => {
    localStorage.setItem('username', 'testuser');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ingresar nombre de usuario');
    fireEvent.change(input, { target: { value: 'testuser' } });

    const button = screen.getByText('Ingresar');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(HOME);
  });

  it('Debe llamar a la función de logueo si el nombre de usuario es válido y no está guardado.', async () => {
    localStorage.removeItem('username');
    window.alert = vi.fn();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 39 }),
      })
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ingresar nombre de usuario');
    fireEvent.change(input, { target: { value: 'testuser' } });

    const button = screen.getByText('Ingresar');
    fireEvent.click(button);
  });
});
