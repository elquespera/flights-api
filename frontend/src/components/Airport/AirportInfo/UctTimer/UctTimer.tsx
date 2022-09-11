import { useEffect, useRef, useState } from 'react';
import './UctTimer.scss';

const UctTimer = ({ uct = 0 }: { uct?: number }) => {
  const [time, setTime] = useState<string>();

  const computeTime = () => {
    let now = Date.now();
    if (uct) { 
      now += uct * 60 * 1000;
    }
    const date = new Date(now);
    setTime(date.toLocaleTimeString("en" , { timeStyle: "short", timeZone: "UTC" }));
  }

  useEffect(() => {
    setTimeout(() => computeTime(), 200);
  }, [time]);

  useEffect(() => computeTime(), [uct]);

  const uctHours = Math.floor(uct / 60);
  const uctMinutes = Math.abs(uct % 60);
  let uctStr = uctHours.toString();
  if (uctMinutes > 0) uctStr += `:${uctMinutes}`;
  if (uctHours > 0) uctStr = '+' + uctStr;

  return (
    <span className="uct-timer">
      <span className='time'>{time}</span>
      <span className='utc'> UTC{uctStr}</span>
    </span>
  )
} 

export default UctTimer;