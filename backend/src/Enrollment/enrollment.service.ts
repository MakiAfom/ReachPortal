import { Enrollment } from "@prisma/client";
import { db } from "../utils/db.server";

export const createEnrollment = async (userId: string, courseId: string): Promise<Enrollment> => {
    return db.enrollment.create({
        data: {
            user: { connect: { id: userId } },
            course: { connect: { id: courseId } }
        }
    });
}

export const deleteEnrollment = async (enrollmentId: string): Promise<void> => {
    await db.enrollment.delete({
        where: {
            id: enrollmentId
        }
    });
}