// Validate Email Format
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

// Validate Password (8–16 chars, one uppercase, one special character)
export const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  return regex.test(password);
};

// Validate Name (20–60 chars)
export const isValidName = (name) => {
  return typeof name === "string" && name.trim().length >= 20 && name.trim().length <= 60;
};

// Validate Address (<= 400 chars)
export const isValidAddress = (address) => {
  return typeof address === "string" && address.trim().length <= 400;
};

// Validate Rating (1–5)
export const isValidRating = (score) => {
  return Number(score) >= 1 && Number(score) <= 5;
};
