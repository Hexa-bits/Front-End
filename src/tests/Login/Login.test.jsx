import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../../containers/App/components/Login/Login';
import { MemoryRouter } from 'react-router-dom';


describe('Login Component', () => {

  it('debería renderizar el título inicialmente oculto', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const title = screen.getByText('EL SWITCHER');
    expect(title).toBeInTheDocument();
    expect(title).not.toHaveClass('visible');
  });

  it('debería mostrar el título después de 500ms', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const title = screen.getByText('EL SWITCHER');
    expect(title).not.toHaveClass('visible');
    await waitFor(() => expect(title).toHaveClass('visible'), { timeout: 600 });
  });

  it('debería mostrar el formulario después de 2000ms', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByPlaceholderText('Ingresar nombre de usuario')).toBeNull();

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ingresar nombre de usuario')).toBeInTheDocument();
      expect(screen.getByText('INGRESAR')).toBeInTheDocument();
    }, { timeout: 2100 });
  });
});
