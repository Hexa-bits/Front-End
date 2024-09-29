import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Game from "../../containers/App/components/Game/Game.jsx";
import { leaveGame } from "../../hooks/Lobby/useLeaveGame.js";
import "@testing-library/jest-dom";

// Mock del hook useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock de leaveGame
jest.mock("../../hooks/Lobby/useLeaveGame.js", () => ({
  leaveGame: jest.fn(),
}));

describe("Game component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    localStorage.setItem("game_id", "12345");
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders button with correct label", () => {
    render(<Game />);
    expect(screen.getByText("Dejar Partida en juego")).toBeInTheDocument();
  });

  test("calls leaveGame on button click", () => {
    render(<Game />);
    const button = screen.getByRole("button", {
      name: /Dejar Partida en juego/i,
    });

    fireEvent.click(button);

    expect(leaveGame).toHaveBeenCalledWith("12345", mockNavigate);
  });
});
