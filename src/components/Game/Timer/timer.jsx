import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { getTimer } from "../../../services/Game/getTimer.js";
import "./timer.css";

const CountdownTimer = ({ resetTimer, onResetCompleted, samePlayer}) => {
  const gameId = sessionStorage.getItem("game_id");
  const [timerState, setTimerState] = useState(null); 

  useEffect(() => {
    const fetchTimer = async () => {
      const timer = await getTimer(gameId);
      setTimerState(timer * 1000);
    };

    fetchTimer();
  }, [gameId, samePlayer]);

  useEffect(() => {
    if (resetTimer) {
      const newTime = 120 * 1000; 
      setTimerState(newTime);
      onResetCompleted();
    }
  }, [resetTimer, onResetCompleted]);

  const renderer = ({ minutes, seconds }) => {
    return (
      <span className="countdown-timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  };

  return (
    timerState !== null && (
      <Countdown key={timerState} date={Date.now() + timerState} renderer={renderer} autoStart={true} />
    )
  );
};
export default CountdownTimer;