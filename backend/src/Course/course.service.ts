import { Course, Enrollment, User } from "@prisma/client";
import { db } from "../utils/db.server";

export type CourseWithEnrollmentsAndUsers = Course & { enrollments: Enrollment[], users: User[] };

export const listCourses = async (): Promise<Course[]> => {
    return db.course.findMany();
}

export const getCourse = async (id: string): Promise<CourseWithEnrollmentsAndUsers | null> => {
    return db.course.findUnique({
        where: {
            id,
        },
        include: {
            enrollments: {
                include: {
                    user: true,
                },
            },
            users: true,
        },
    });
}

export const createCourse = async (course: Omit<Course, "id">): Promise<Course> => {
    const { title, description, image } = course;
    return db.course.create({
        data: {
            title,
            description,
            image,
        },
    });
}

export const updateCourse = async (course: Omit<Course, "id">, id: string): Promise<Course> => {
    const { title, description, image } = course;
    return db.course.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            image,
        },
    });
}

export const deleteCourse = async (id: string): Promise<void> => {
    await db.course.delete({
        where: {
            id,
        },
    });
}