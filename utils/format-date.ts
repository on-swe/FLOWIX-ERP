import { format, isToday, isYesterday } from "date-fns";

export function formatDate(date: string | Date) {
  const d = new Date(date);
  if (isToday(d)) {
    return format(d, "h:mm a");
  }
  if (isYesterday(d)) {
    return "Yesterday";
  }
  return format(d, "MMM d");
}
