import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../containers/App/components/Login/Login.jsx';
import { HOME, LoginHelpText} from '../../utils/Constants.js';
import '@testing-library/jest-dom'; 


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login form', () => {
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

  it('should update username on input change', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ingresar nombre de usuario');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input.value).toBe('testuser');
  });

  it('should show alert if username is invalid', () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const button = screen.getByText('Ingresar');
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Nombre ' + LoginHelpText);
  });

  it('should navigate to home if username is valid and already saved', () => {
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

  it('should call register function if username is valid and not saved', async () => {
    localStorage.removeItem('username');
    window.alert = jest.fn(); // Mocks alert

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 39 }), // Asegúrate de que la propiedad es 'Id'
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

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Usuario testuser creado exitosamente con Id: 39.');
    });
  });
});