import { useEffect, useState, useRef } from "react";

// Function Types
type StartProgress = () => void;
type StopProgress = () => void;
type Reset = () => void;

export type UseCursorReturn = {
  progress: number;
  startProgress: StartProgress;
  stopProgress: StopProgress;
  reset: Reset;
};

let registeredProgress: number = 0;

const useCursor = (): UseCursorReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const intervelRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (startTime) {
      const progressInterval = setInterval(() => {
        const timeNow = new Date().getTime();
        const timeDifference = timeNow - startTime;

        const newProgress = registeredProgress + timeDifference / 1000;
        setProgress(newProgress);
      }, 10);
      intervelRef.current = progressInterval;
    } else if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }
  }, [startTime]);

  const startProgress: StartProgress = () => {
    if (!intervelRef.current) {
      const timeNow = new Date().getTime();
      setStartTime(timeNow);

      registeredProgress = progress;
    }
  };

  const stopProgress: StopProgress = () => {
    setStartTime(0);
    registeredProgress = 0;
  };

  const reset: Reset = () => {
    stopProgress();
    setProgress(0);
  };

  return {
    progress,
    startProgress,
    stopProgress,
    reset,
  };
};

export default useCursor;
