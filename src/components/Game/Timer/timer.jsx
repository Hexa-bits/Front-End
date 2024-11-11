import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import "./timer.css";

const CountdownTimer = ({ resetTimer, onResetCompleted }) => {
  const storedTime = sessionStorage.getItem("countdownTime"); // Busco el tiempo guardado si es que hay
  const initialTime = storedTime
    ? parseInt(storedTime, 10) //si hay stored time lo pienso como inicial, sino establezco un nuevo tiempo inicial
    : Date.now() + 120000; // 2 minutos = 120.000 milisegundps

  const [time, setTime] = useState(initialTime);

  // Función para reiniciar el temporizador cuando se llama resetTimer externamente
  useEffect(() => {
    if (resetTimer) {
      const newTime = Date.now() + 120000;
      setTime(newTime);
      sessionStorage.setItem("countdownTime", newTime); // Guarda el nuevo tiempo reiniciadp en sessionstorage
      onResetCompleted();
    }
  }, [resetTimer, onResetCompleted]);

  const renderer = ({ minutes, seconds, completed }) => {
    return (
      <span className="countdown-timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  };

  useEffect(() => {
    // Cada vez que el tiempo cambia,se gguarda en sessionstorage
    sessionStorage.setItem("countdownTime", time);
  }, [time]);

  return (
    <Countdown key={time} date={time} renderer={renderer} autoStart={true} />
  );
};

export default CountdownTimer;
