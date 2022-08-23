type DateTime = {
  date: string;
  time: string;
  milliseconds: number;
}

export const formatDateTime = (datetime?: string, uct?: number): DateTime => {
  if (!datetime) 
    return { date: '', time: '', milliseconds: 0 };

  let date = new Date(datetime);
  if (uct) date = new Date(date.getTime() + uct * 60 * 1000);

  return {
    date: date.toLocaleDateString([], { day: "numeric", month: "short", timeZone: "UTC" }),
    time: date.toLocaleTimeString("en" , { timeStyle: "short", timeZone: "UTC" }),
    milliseconds: date.getTime(),
  }
} 