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
  //const [startTime, setStartTime] = useState(Date.now() + 120000); // Tiempo de inicio del temporizador (2 minutos)
  const [isRunning, setIsRunning] = useState(true); // Estado para controlar si el temporizador está en ejecución

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
      setIsRunning(false); // Detener el temporizador
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
      date={Date.now() + 120000}
      renderer={renderer}
      autoStart={isRunning}
    />
  );
};

export default CountdownTimer;
