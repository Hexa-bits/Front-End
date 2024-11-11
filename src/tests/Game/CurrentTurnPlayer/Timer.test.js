import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CountdownTimer from "../../../components/Game/Timer/timer";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("useEffect con resetTimer", () => {
  it("debería reiniciar el temporizador y actualizar sessionStorage cuando resetTimer es true", async () => {
    // Mock de sessionStorage
    global.sessionStorage.setItem = vi.fn();

    // Mock de la función onResetCompleted
    const onResetCompleted = vi.fn();

    // Estado inicial para resetTimer es false
    const { rerender } = render(
      <CountdownTimer resetTimer={false} onResetCompleted={onResetCompleted} />
    );

    // Asegúrate de que no se haya llamado a la función onResetCompleted
    expect(onResetCompleted).not.toHaveBeenCalled();

    // Simula un cambio de resetTimer a true
    rerender(
      <CountdownTimer resetTimer={true} onResetCompleted={onResetCompleted} />
    );

    // Verificar que sessionStorage se haya actualizado con un nuevo tiempo
    expect(global.sessionStorage.setItem).toHaveBeenCalled();
    expect(global.sessionStorage.setItem).toHaveBeenCalledWith(
      "countdownTime", // Clave correcta
      expect.any(String) // El valor debe ser una cadena (el tiempo en milisegundos)
    );

    // Verificar que onResetCompleted haya sido llamada
    expect(onResetCompleted).toHaveBeenCalledTimes(1);

    // Si quieres verificar el valor de tiempo en el estado, puedes hacer algo como:
    // Verificar que el tiempo se ha actualizado, por ejemplo
    const newTime = Date.now() + 120000; // Tiempo estimado después del reset
    const timerElement = screen.queryByText(/00:00/); // Verifica el timer que se renderiza

    // Dependiendo de cómo formateas el tiempo, podrías necesitar ajustar esto
    // pero como este test se centra en el comportamiento del useEffect, puedes simplemente
    // verificar que el temporizador ha sido actualizado, sin necesidad de verificar el texto.
    expect(timerElement).not.toBeInTheDocument(); // Es un ejemplo de cómo podrías verificar el cambio
  });
});
