import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import "./timer.css";

const Completionist = () => (
  <span className="completion">¡Se terminó el turno!</span>
);

const CountdownTimer = ({ resetTimer, onResetCompleted }) => {
  const [time, setTime] = useState(Date.now() + 120000); // 2 minutos

  // Función para reiniciar el temporizador cuando se llama resetTimer externamente
  useEffect(() => {
    if (resetTimer) {
      setTime(Date.now() + 120000);
      onResetCompleted();
    }
  }, [resetTimer, onResetCompleted]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
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
    <Countdown key={time} date={time} renderer={renderer} autoStart={true} />
  );
};

export default CountdownTimer;
