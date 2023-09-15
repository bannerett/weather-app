// Function to convert AM/PM time string to 24-hour format
export const convertTo24Hour = (time12h: string) => {
  // Extract hours, minutes, and AM/PM from the input string
  const match = time12h.match(/^(\d+):(\d+)\s+(AM|PM)$/i);

  if (!match) {
    // Invalid input format
    return null;
  }

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  // Format the result as a 24-hour time string
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');

  return `${hoursStr}:${minutesStr}`;
};

// Function to convert 24-hour time string to AM/PM format
export const convertTo12Hour = (time24h: string) => {
  // Extract hours and minutes from the input string
  const match = time24h.match(/^(\d+):(\d+)$/);

  if (!match) {
    // Invalid input format
    return null;
  }

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);

  // Determine AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  if (hours === 0) {
    hours = 12; // 12:00 AM
  } else if (hours > 12) {
    hours -= 12;
  }

  // Format the result as a 12-hour time string
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');

  return `${hoursStr}:${minutesStr} ${period}`;
};
