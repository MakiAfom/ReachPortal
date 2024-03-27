import {
  checkEmail,
  checkLength,
  checkPassword,
  checkRequired,
} from "./checkInputs";

export function validateUsername(value: string) {
  const name = value.trim();

  let errMsg = checkRequired("Username", name);
  if (errMsg) return errMsg;

  errMsg = checkLength("Username", name, 3, 50);
  return errMsg;
}

export function validateEmail(value: string) {
  const email = value.trim();

  let errMsg = checkRequired("Email", email);
  if (errMsg) return errMsg;

  errMsg = checkEmail(email);
  return errMsg;
}

export function validateRole(value: string) {
  const role = value.trim();

  let errMsg = checkRequired("Role", role);
  return errMsg;
}

export function validatePassword(value: string) {
  const password = value.trim();

  let errMsg = checkRequired("Password", password);
  if (errMsg) return errMsg;

  errMsg = checkPassword(password);
  return errMsg;
}
