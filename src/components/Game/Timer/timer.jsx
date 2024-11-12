import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { getTimer } from "../../../services/Game/getTimer.js";
import "./timer.css";

const CountdownTimer = ({ resetTimer, onResetCompleted }) => {
  const storedTime = sessionStorage.getItem("countdownTime"); 
  const initialTime = storedTime
    ? parseInt(storedTime, 10) 
    : Date.now() + 120000; 

  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (resetTimer) {
      const newTime = Date.now() + 120000;
      setTime(newTime);
      sessionStorage.setItem("countdownTime", newTime); 
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
   
    sessionStorage.setItem("countdownTime", time);
  }, [time]);

  return (
    <Countdown key={time} date={time} renderer={renderer} autoStart={true} />
  );
};

export default CountdownTimer;