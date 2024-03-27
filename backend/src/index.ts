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
import { jobVacancyRouter } from "./JobVacancy/jobVacancy.router";
import { newsRouter } from "./News/news.router";
import { healthFacilityRouter } from "./HealthFacility/healthFacility.router";
import { legalAidOrganizationRouter } from "./LegalAidOrganization/legalAidOrganization.router";
import { jobTrainingProgramRouter } from "./JobTrainingProgram/jobTrainingProgram.router";
import { communitySupportServiceRouter } from "./CommunitySupportService/communitySupportService.router";
import { userRouter } from "./User/user.router";
import { additionalInfoRouter } from "./AdditionalInfo/additionalInfo.router";
import { courseRouter } from "./Course/course.router";
import { enrollmentRouter } from "./Enrollment/enrollment.router";
import { privateMessageRouter } from "./PrivateMessage/privateMessage.router";
import { messageAdminRouter } from "./MessageAdmin/messageAdmin.router";
import { referralLinkRouter } from "./ReferralLink/referralLink.router";
import { eventRouter } from "./Event/event.router";
import { eventRegistrationRouter } from "./EventRegistration/eventRegistration.router";
import { forumPostRouter } from "./ForumPost/forumPost.router";
import { commentRouter } from "./Comment/comment.router";
import { noteRouter } from "./Note/note.router";
import { announcementRouter } from "./Announcements/announcement.router";

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
    const { email, name, password, image, role }: Person = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image,
        role,
      },
    });
    
    const token = jwt.sign(
      { username: newUser.name, email: newUser.email, role: newUser.role, image: newUser.image },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
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
      { name: user.name, email: user.email, role: user.role, image: user.image }, // Remove 'image: user.role'
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "7d" }
    );

    const tokenExpirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    res.json({
      username: user.name,
      email: user.email,
      role: user.role,
      token,
      tokenExpirationDate,
    });
  })
);

app.use("/api/user", userRouter)
app.use("/api/additionalInfo", additionalInfoRouter)
app.use("/api/course", courseRouter)
app.use("/api/jobVacancy", jobVacancyRouter)
app.use("/api/messageAdmin", messageAdminRouter)
app.use("/api/referralLink", referralLinkRouter)
app.use("/api/enrollment", enrollmentRouter)
app.use("/api/eventRegistration", eventRegistrationRouter)
app.use("/api/privateMessage", privateMessageRouter)
app.use("/api/forumPost", forumPostRouter)
app.use("/api/notes", noteRouter)
app.use("/api/announcement", announcementRouter)
app.use("/api/comment", commentRouter)
app.use("/api/events", eventRouter)
app.use("/api/news", newsRouter)
app.use("/api/healthFacility", healthFacilityRouter)
app.use("/api/legalAidOrganization", legalAidOrganizationRouter)
app.use("/api/jobTrainingProgram", jobTrainingProgramRouter)
app.use("/api/communitySupportService", communitySupportServiceRouter)



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
  console.log("Server is running at 9000");
});
