// JoinForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, vi, test, beforeEach } from "vitest";
import JoinForm from "../../components/Home/JoinForm/JoinForm";
import React from 'react';
import joinGame from '../../services/Home/JoinGame.js';
import { useNavigate } from 'react-router-dom';
import { hashPassword } from '../../services/Home/encrypt.js';

// Mocks
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

vi.mock('../../services/Home/JoinGame.js', () => ({
    __esModule: true,
    default: vi.fn(),
}));


describe('JoinForm Component', () => {
    const mockNavigate = vi.fn();
    const setShowForm = vi.fn();
    const game_id = '1234';
    const player_id = '5678';

    useNavigate.mockReturnValue(mockNavigate);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Debe renderizar el modal JoinForm.', () => {
        render(<JoinForm gameId={game_id} playerId={player_id} setShowForm={setShowForm} />);
        expect(screen.getByText('Introduce la contraseña')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    test('Debe mostrar mensaje de error si el campo de contraseña está vacío y se intenta confirmar.', async () => {
        render(<JoinForm gameId={game_id} playerId={player_id} setShowForm={setShowForm} />);

        const confirmButton = screen.getByText('Confirmar');
        fireEvent.click(confirmButton);

        expect(screen.getByText('Campo requerido !')).toBeInTheDocument();
    });

    test('Debe llamar a la función joinGame con la contraseña encriptada al confirmar.', async () => {
        render(<JoinForm gameId={game_id} playerId={player_id} setShowForm={setShowForm} />);

        const passwordInput = screen.getByPlaceholderText('Contraseña');
        fireEvent.change(passwordInput, { target: { value: 'mi_contrasena' } });

        const confirmButton = screen.getByText('Confirmar');
        fireEvent.click(confirmButton);
        
        await waitFor(()=> {
            const hashedPass = hashPassword(passwordInput.value);
            expect(joinGame).toHaveBeenCalledWith(game_id, player_id, hashedPass, mockNavigate);
        });
    });

    test('Debe mostrar mensaje de error si la contraseña es incorrecta.', async () => {
        joinGame.mockReturnValue(false); 
        render(<JoinForm gameId={game_id} playerId={player_id} setShowForm={setShowForm} />);

        const passwordInput = screen.getByPlaceholderText('Contraseña');
        fireEvent.change(passwordInput, { target: { value: 'incorrecta' } });

        const confirmButton = screen.getByText('Confirmar');
        fireEvent.click(confirmButton);

        expect(await screen.findByText('Contraseña incorrecta !')).toBeInTheDocument();
    });

    test('Debe cerrar el modal al hacer clic en el botón de cerrar.', () => {
        render(<JoinForm gameId={game_id} playerId={player_id} setShowForm={setShowForm} />);

        const closeButton = document.querySelector('.btn.close');
        fireEvent.click(closeButton);

        expect(setShowForm).toHaveBeenCalledWith(false);
    });
});
