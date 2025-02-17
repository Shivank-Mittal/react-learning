/**
 * Generate a password depending on the length and number
 * @param length
 * @param includeNumbers
 * @param includeSpecialChars
 * @returns password
 */
export default function generateRandomString(
  callback: (value: string) => unknown,
  length: number,
  includeNumbers: boolean,
  includeSpecialChars: boolean,
) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Build the character set based on the parameters
  let characters = letters;
  if (includeNumbers) {
    characters += numbers;
  }
  if (includeSpecialChars) {
    characters += specialChars;
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  callback(result);
}
