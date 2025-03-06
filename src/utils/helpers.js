/**
 * Generates a random hexadecimal color
 * @returns {string} - Hexadecimal color code (e.g., #FF5733)
 */
export function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * List of horse names for selection
 */
export const horseNames = [
    'Dragon Flame',
    'Deniz Efe',
    'Son Of Cooger',
    'General Briella',
    'Borrego',
    'Vincitore',
    'Wardenclyffe',
    'Madras',
    'Giz',
    'Akatahan',
    'Long Runner',
    'Alihan',
    'Oğlum Doruk',
    'Karaüzüm',
    'Cankardeşler',
    'Demirperde',
    'Oğuzboylu',
    'Soyluşah',
    'Captain Fantastic',
    'Gülhatmi'
]; 