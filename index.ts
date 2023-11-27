import { getTime } from "date-fns";
import { useState, useRef } from "react";

interface useTimerOutput {
  timeLeft: number;
  isOver: boolean;
  reset: (stopConditionCallback: () => boolean) => void;
  stop: () => void;
}

const useTimer = (timeLeftAsSecond: number): useTimerOutput => {
  const endAtRef = useRef<number>(null);
  const intervals = useRef<Array<NodeJS.Timeout>>([]);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isOver, setIsOver] = useState<boolean>(false);

  function processTime(callback: () => boolean) {
    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1000);

      const currentTime = getTime(new Date());
      const isOver = callback() || endAtRef.current <= currentTime;

      if (isOver) {
        setIsOver(true);

        return;
      }

      processTime(callback);
    }, 1000);

    intervals.current.push(timeout);
  }

  // 처음에 설정되었던 시간으로 되돌려 카운트다운을 재시작한다
  const reset = (stopConditionCallback: () => boolean) => {
    if (intervals.current.length) {
      intervals.current.forEach((timeoutFunc) => clearTimeout(timeoutFunc));
    }

    setIsOver(false);

    const currentTime = getTime(new Date());
    const timeLeft = timeLeftAsSecond * 1000;

    endAtRef.current = currentTime + timeLeft;
    setTimeLeft(timeLeft);

    processTime(stopConditionCallback);
  };

  // 남은 시간은 그대로 두고 시계를 멈춘다
  const stop = () => {
    if (intervals.current.length) {
      intervals.current.forEach((timeoutFunc) => clearTimeout(timeoutFunc));
    }

    setIsOver(true);
  };

  return {
    timeLeft,
    isOver,
    reset,
    stop,
  };
};

module.exports = {
  useTimer,
};
