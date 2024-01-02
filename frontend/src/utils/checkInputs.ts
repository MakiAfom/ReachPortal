export function checkRequired(inputName: string, value: string): string | null {
  if (!value) {
    return `${inputName} is required`;
  }

  return null;
}

export function checkLength(
  inputName: string,
  value: string,
  min: number,
  max: number
): string | null {
  if (value.length < min) {
    return `${inputName} must be greater than ${min} characters`;
  } else if (value.length > max) {
    return `${inputName} must be less than ${max} characters`;
  } else {
    return null;
  }
}

export function checkEmail(email: string): string | null {
  const isEmailValid = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!isEmailValid) {
    return "Please enter a valid email";
  }

  return null;
}

export function checkPassword(password: string): string | null {
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{7,15}$/.test(password);
  if (!isPasswordValid) {
    return "Password must be at least 7 characters and contain a capital letter, small letter, number and special character";
  }

  return null;
}
