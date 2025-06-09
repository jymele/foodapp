export function getUTCDate(date: Date): Date {
  const utcDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  return utcDate;
}

export function getStartofWeekFromDate(date: Date): Date {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return startOfWeek;
}

export function getEndofWeekFromDate(date: Date): Date {
  let startOfWeek = getStartofWeekFromDate(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
}
