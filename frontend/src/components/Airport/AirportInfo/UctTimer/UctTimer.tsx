import { useEffect, useRef, useState } from 'react';
import './UctTimer.scss';

const UctTimer = ({ uct }: { uct?: number }) => {
  const [time, setTime] = useState<string>();

  const computeTime = () => {
    let now = Date.now();
    if (uct) { 
      now += uct * 60 * 1000;
    }
    const date = new Date(now);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }

  useEffect(() => {
    setTimeout(() => computeTime(), 200);
  }, [time]);

  useEffect(() => computeTime(), [uct]);

  return (
    <div className="uct-timer">
      {time}
    </div>
  )
} 

export default UctTimer;