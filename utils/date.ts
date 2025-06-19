export function getStartofWeekFromDate(date: Date): Date {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return startOfWeek;
}

export function getEndofWeekFromDate(date: Date): Date {
  const startOfWeek = getStartofWeekFromDate(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
}

export const formatDate = (date: Date) => {
  return date.toUTCString().split(" ").slice(0, 4).join(" ");
};
