import { RequestHandler } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import AppError from "./AppError";
import { Person, personSchema, userSchema } from "./zodSchemas";
import wrapAsync from "./wrapAsync";

const prisma = new PrismaClient();

export const validatePerson: RequestHandler = (req, res, next) => {
  const result = personSchema.safeParse(req.body);
  if (!result.success) {
    return next(
      new AppError(result.error.issues.map((el) => el.message).join(", "), 422)
    );
  }

  next();
};

export const validateUser: RequestHandler = (req, res, next) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return next(
      new AppError(result.error.issues.map((el) => el.message).join(", "), 422)
    );
  }

  next();
};

export const userAlreadyExists = wrapAsync(async (req, res, next) => {
  const { email, username }: Person = req.body;

  let user = await prisma.user.findFirst({ where: { username } });
  if (user) {
    return next(new AppError("User already exists", 400));
  }

  user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return next(new AppError("User already exists", 400));
  }

  next();
});

export const loginUser = wrapAsync(async (req, res, next) => {
  const { email, password }: User = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return next(new AppError("Invalid credentials", 400));
  }

  next();
});
