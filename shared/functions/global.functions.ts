export const checkEmailFormat = (email: string) => {
  // Regular expression pattern to match email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the pattern
  return emailRegex.test(email);
};
