import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Game from "../../containers/App/components/Game/Game.jsx";
import { leaveGame } from "../../hooks/Lobby/useLeaveGame.js";
import { leave } from "../../hooks/Game/leave.js";
import "@testing-library/jest-dom";

// Mock del hook useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock de leaveGame
jest.mock("../../hooks/Lobby/useLeaveGame.js", () => ({
  leaveGame: jest.fn(),
}));

//mock del leave
jest.mock("../../hooks/Game/leave.js", () => ({
  leave: jest.fn(),
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
    expect(screen.getByText("Abandonar Juego")).toBeInTheDocument();
  });

  test("renders button with correct label", () => {
    render(<Game />);
    expect(screen.getByText("End Turn")).toBeInTheDocument();
  });

  test("calls leaveGame on button click", () => {
    render(<Game />);
    const button = screen.getByRole("button", {
      name: /Abandonar Juego/i,
    });

    fireEvent.click(button);

    expect(leaveGame).toHaveBeenCalledWith("12345", mockNavigate);
  });

  test("calls leave on button click", () => {
    render(<Game />);
    const button = screen.getByRole("button", {
      name: /End Turn/i,
    });

    fireEvent.click(button);

    expect(leave).toHaveBeenCalled();
  });
});
//PARA Q FUNCIONEN LOS TESTS COMENTAR TODO LO QUE TIENE QUE VER CON FIGURA
//EN TODOS LADOS
