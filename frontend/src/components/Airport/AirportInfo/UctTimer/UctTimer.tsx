import { useEffect, useRef, useState } from 'react';
import './UctTimer.scss';

const UctTimer = ({ uct }: { uct?: number }) => {
  const computeTime = () => {
    let now = Date.now();
    if (uct) { 
      now += uct * 60 * 1000;
    }
    const date = new Date(now);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const [time, setTime] = useState(computeTime());

  useEffect(() => {
    setTimeout(() => {
      setTime(computeTime());
    }, 1000);
  }, [time]);

  return (
    <div className="uct-timer">
      {time}
    </div>
  )
} 

export default UctTimer;