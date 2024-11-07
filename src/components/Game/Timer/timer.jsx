import React from "react";
import Countdown from "react-countdown";
import "./timer.css";

// Componente cuando el tiempo se acaba
const Completionist = () => (
  <span className="completion">¡Se terminó el tiempo!</span>
);

// Renderer callback con condiciones
const CountdownTimer = () => {
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

  return <Countdown date={Date.now() + 120000} renderer={renderer} />;
};

export default CountdownTimer;
