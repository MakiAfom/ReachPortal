import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as CourseService from "./course.service";

export const courseRouter = express.Router();

// GET: List all courses
courseRouter.get("/", async (req: Request, res: Response) => {
    try {
        const courses = await CourseService.listCourses();
        return res.status(200).json(courses);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get a course by ID with enrollments and users
courseRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const course = await CourseService.getCourse(id);
        if (course) {
            return res.status(200).json(course);
        }
        return res.status(404).json("Course not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: Create a new course
courseRouter.post(
    "/",
    body("title").isString().notEmpty(),
    body("description").optional().isString(),
    body("image").isString().notEmpty(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const course = req.body;
            const newCourse = await CourseService.createCourse(course);
            return res.status(201).json(newCourse);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

// PUT: Update an existing course
courseRouter.put(
    "/:id",
    body("title").isString().notEmpty(),
    body("description").optional().isString(),
    body("image").isString().notEmpty(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const course = req.body;
            const updatedCourse = await CourseService.updateCourse(course, id);
            return res.status(200).json(updatedCourse);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

// DELETE: Delete a course by ID
courseRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await CourseService.deleteCourse(id);
        return res.status(200).json("Course has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});