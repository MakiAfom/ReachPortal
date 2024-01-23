import { z } from "zod";

const passwordRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)(?!.*\\s).{7,15}$"
);

export const userSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email address is invalid",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .regex(passwordRegExp, {
      message: "Password is invalid",
    }),
});

export const personSchema = userSchema.extend({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, { message: "Username must be at least three characters long" })
    .max(50, { message: "Username must be less than Fifty characters long" }),
  role: z.enum(["Refugee", "Volunteer", "Admin"]).default("Refugee"),
});

export type User = z.infer<typeof userSchema>;

export type Person = z.infer<typeof personSchema>;
