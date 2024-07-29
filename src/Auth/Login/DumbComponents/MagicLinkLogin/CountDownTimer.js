import React from "react";
import { useState, useEffect } from "react";

const CountDownTimer = (props) => {
  const { min, sec, redirectUrl, content, showDisable } = props.timer;
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);

  const tick = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        // clearInterval(myInterval);
        reset();
      } else {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
  };
  const reset = () => {
    window.location.href = `${redirectUrl}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <span>
      {minutes === 0 && seconds === 0 ? (showDisable ? props.setChanged() : null): (
        <span>
          {content}
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </span>
  );
};

export default CountDownTimer;
