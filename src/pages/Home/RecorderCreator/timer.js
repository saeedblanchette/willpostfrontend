import { useEffect, useState, useRef } from 'react';
export const useTimer = () => {
  const intervalRef = useRef(0);
  // const [startTime, setStartTime] = useState(0);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [timeString, setTimeString] = useState('00:00');
  const timeCount = useRef(0);

  const countSec = () => {
    timeCount.current += 1000;
    let timeStringVal = timeToString(timeCount.current);
    setTimeString(timeStringVal);
  };

  const timeToString = time => {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');

    return `${formattedMM}:${formattedSS}`;
  };
  const start = () => {
    // const startTimeVal = Date.now() - elapsedTime;
    clearInterval(intervalRef.current);
    // setStartTime(startTimeVal);
    const val = setInterval(countSec, 1000);
    intervalRef.current = val;
  };

  const pause = () => {
    clearInterval(intervalRef.current);
  };
  const resume = () => {
    clearInterval(intervalRef.current);
    const val = setInterval(countSec, 1000);
    intervalRef.current = val;
  };
  const stop = () => {
    clearInterval(intervalRef.current);
    timeCount.current = -1000;
    setTimeString('00:00');
  };
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return { timeString, start, stop, pause, resume };
};
