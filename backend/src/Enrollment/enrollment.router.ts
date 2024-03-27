import express from "express";
import type { Request, Response } from "express";
import * as EnrollmentService from "./enrollment.service";

export const enrollmentRouter = express.Router();

// POST: Create a new enrollment
enrollmentRouter.post("/", async (req: Request, res: Response) => {
    const { userId, courseId } = req.body;
    try {
        const enrollment = await EnrollmentService.createEnrollment(userId, courseId);
        return res.status(201).json(enrollment);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete an enrollment by ID
enrollmentRouter.delete("/:id", async (req: Request, res: Response) => {
    const enrollmentId: string = req.params.id;
    try {
        await EnrollmentService.deleteEnrollment(enrollmentId);
        return res.status(200).json("Enrollment has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});