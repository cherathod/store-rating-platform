export const validateRegisterForm = (data) => {
  const errors = {};

  // Name validation (reuse validateName)
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  // Email validation (reuse validateEmail)
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  // Address validation (reuse validateAddress) — only if your registration needs address
  if (data.address !== undefined) {
    const addressError = validateAddress(data.address);
    if (addressError) errors.address = addressError;
  }

  // Password validation (reuse validatePassword)
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  // Confirm password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
