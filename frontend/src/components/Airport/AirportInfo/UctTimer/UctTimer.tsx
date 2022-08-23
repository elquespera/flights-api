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
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
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