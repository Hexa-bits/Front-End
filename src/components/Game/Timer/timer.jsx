import React from "react";
import Countdown from "react-countdown";
import "./timer.css";
import { useState } from "react";

// Componente cuando el tiempo se acaba
const Completionist = () => (
  <span className="completion">¡Se terminó el turno!</span>
);

// Renderer callback con condiciones
const CountdownTimer = () => {
  const [endTime, setEndTime] = useState(Date.now() + 120000); // 2 minutos desde ahora

  // Función para reiniciar el temporizador
  const handleComplete = () => {
    setEndTime(Date.now() + 120000); // Actualiza el tiempo de finalización a 2 minutos a partir de ahora
  };
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      handleComplete(); // quiero reiniciar el temporizador el temporizador
    } else {
      return (
        <span className="countdown-timer">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    }
  };

  return (
    <Countdown
      key={endTime}
      date={Date.now() + 120000}
      renderer={renderer}
      autoStart={true}
      onComplete={handleComplete}
    />
  );
};

export default CountdownTimer;
