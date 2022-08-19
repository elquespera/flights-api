type DateTime = {
  date: string;
  time: string;
  milliseconds: number;
}

export const formatDateTime = (datetime?: string): DateTime => {
  if (!datetime) 
    return { date: '', time: '', milliseconds: 0 };

  const date = new Date(datetime);
  return {
    date: date.toLocaleDateString([], { day: "numeric", month: "short" }),
    time: date.toLocaleTimeString("en" , { timeStyle: "short" }),
    milliseconds: date.getTime(),
  }
} 