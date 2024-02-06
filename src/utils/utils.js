export const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatDateString(inputDate) {
  let date = inputDate;

  if (!inputDate) {
    return '';
  }

  if (!(inputDate instanceof Date)) {
    date = new Date(inputDate + 'T12:00:00Z');
  }

  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}