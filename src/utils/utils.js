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

export function formatDateToDB(inputDateString) {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(inputDate.getDate()).padStart(2, '0');

  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}

export function parseStringToFloat(userInput) {
  const sanitizedInput = userInput.replace('$', '').trim();
  const parsedValue = parseFloat(sanitizedInput);

  if (!isNaN(parsedValue)) {
    const formattedValue = parsedValue.toFixed(2);

    return formattedValue;
  }

  return parsedValue;
}

export function formatNumberIntoCurrency(number) {
  const value = Number(number);
  const formattedValue = value.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD'
  });

  return formattedValue;
}

// Helper functions to check date ranges
export const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isWithinLastSevenDays = (date) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Considering today as well
  return date >= sevenDaysAgo && date <= today;
};

export const isThisMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

export const isThisYear = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};

// Helper function to get text for time range header
export const getTimeRangeHeaderText = (timeRange) => {
  switch (timeRange) {
    case 'Today':
      return 'Today';
    case 'Last Seven Days':
      return 'Last Seven Days';
    case 'This Month':
      return 'This Month';
    case 'This Year':
      return 'This Year';
    default:
      return 'All Expenses';
  }
};