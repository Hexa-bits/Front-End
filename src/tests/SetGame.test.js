import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Start from "../containers/App/components/SetGame/setgame"; // Asegúrate de que la ruta sea correcta
import '@testing-library/jest-dom';

// Mock de useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
})); //va a simular la navegación

describe("Start Component", () => {
  beforeEach(() => {
    // Limpia el localStorage antes de cada prueba
    localStorage.clear();
  });

  test("Debe renderizar el componente Start", () => {
    render(<Start />); //ANDA
     expect(screen.getByText("Bienvenido a el Switcher")).toBeInTheDocument();
    expect(screen.getByText("Nombre de la partida")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ingrese un nombre")).toBeInTheDocument();
    expect(screen.getByText("Elige la cantidad de participantes")).toBeInTheDocument();
    expect(screen.getByText("Crear partida")).toBeInTheDocument();
  });

  test("Debe actualizar el nombre del juego", () => {
    render(<Start />);
    const input = screen.getByLabelText("Nombre de la partida");
    fireEvent.change(input, { target: { value: "Mi Juego" } });
    expect(input.value).toBe("Mi Juego");
  });

  test("Debe setear la cantidad de jugadores al clickear", () => {
    render(<Start />);
    const e1 = screen.getByTestId('asd')
    fireEvent.click(screen.getByText("2"));
    expect(e1.innerHTML).toBe("Participantes: 2")
    fireEvent.click(screen.getByText("3"));
    expect(e1.innerHTML).toBe("Participantes: 3")
    fireEvent.click(screen.getByText("4"));
    expect(e1.innerHTML).toBe("Participantes: 4")
  });

  test("Debe alertar en caso de nombre inválido", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Start />);
    fireEvent.click(screen.getByText("Crear partida"));
    expect(window.alert).toHaveBeenCalledWith("error, el nombre debe tener entre 1 y 10 caracteres");
  });

  test("Debe alertar en caso de cantidad de jugadores inválida", () => {
    render(<Start />);
    fireEvent.change(screen.getByLabelText("Nombre de la partida"), { target: { value: "Juego" } });
    fireEvent.click(screen.getByText("Crear partida"));
    expect(window.alert).toHaveBeenCalledWith("error, la cantidad de jugadores es invalida");
  });
});