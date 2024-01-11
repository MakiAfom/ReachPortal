if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { ErrorRequestHandler, RequestHandler } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import AppError from "./utils/AppError";
import wrapAsync from "./utils/wrapAsync";
import {
  loginUser,
  userAlreadyExists,
  validatePerson,
  validateUser,
} from "./utils/middlewares";
import { Person } from "./utils/zodSchemas";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home");
});

app.post(
  "/api/register",
  validatePerson,
  userAlreadyExists,
  wrapAsync(async (req, res) => {
    const { email, username, password, role }: Person = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign(
      { username: newUser.username, email: newUser.email, role: newUser.role },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token,
      tokenExpirationDate,
    });
  })
);

app.post(
  "/api/login",
  validateUser,
  loginUser,
  wrapAsync(async (req, res, next) => {
    const { email }: User = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return next(new AppError("User not found", 500));
    }

    const token = jwt.sign(
      { username: user.username, email: user.email, role: user.role },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      token,
      tokenExpirationDate,
    });
  })
);

const notFound: RequestHandler = (req, res, next) => {
  next(new AppError("Resource not found", 404));
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { message = "Something went wrong!", statusCode = 500 } = err;
  res.status(statusCode).json({ message });
};

app.all("*", notFound);
app.use(errorHandler);

app.listen(9000, () => {
  console.log("Server is running");
});
