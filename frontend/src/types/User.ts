export default interface User {
  userId: string;
  username: string;
  email: string;
  role: "" | "Admin" | "Refugee" | "Volunteer";
  token: string;
  tokenExpirationDate: string;
}
