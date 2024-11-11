import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CountdownTimer from "../../../components/Game/Timer"; // Ajusta la ruta si es necesario

describe("CountdownTimer", () => {
  let mockSessionStorage;

  beforeEach(() => {
    mockSessionStorage = vi.spyOn(global.sessionStorage, "getItem");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería inicializar el temporizador con el tiempo guardado en sessionStorage", () => {
    const storedTime = Date.now() + 120000; // Establece un tiempo guardado de 2 minutos
    mockSessionStorage.mockReturnValue(storedTime.toString()); // Simula que hay un tiempo guardado

    render(<CountdownTimer resetTimer={false} onResetCompleted={vi.fn()} />);

    // Verifica que el temporizador está mostrando el tiempo guardado
    const timerElement = screen.getByText(/^02:00$/); // Esperamos el formato 02:00 para 2 minutos
    expect(timerElement).toBeInTheDocument();
  });
});
