export function getSlicePoints(selectedDay: string) {
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const slicePoints: number[] = [];
  let month = Number(selectedDay) > today 
    ? currentMonth - 1 < 0
      ? 11
      : currentMonth -1
    : currentMonth;
  let year = month > currentMonth ? currentYear - 1 : currentYear;
  while (slicePoints.length < 12) {
    slicePoints.push(new Date(year, month, Number(selectedDay)).getTime());
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  }

  return slicePoints.reverse();
}