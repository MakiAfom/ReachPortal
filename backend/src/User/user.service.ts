import { Role, Event, Note, Enrollment, Course, PrivateMessage } from "@prisma/client";
import { db } from "../utils/db.server"

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: Role;
    events?: Event[]; // Marking the fields as optional
    notes?: Note[];
    enrolledIn?: Enrollment[];
    courses?: Course[];
    sentMessages?: PrivateMessage[];
}

export const listUser = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            image: true,
            role: true,
            events: true,
            notes: true,
            enrolledIn: true,
            courses: true,
            sentMessages: true,
        },
    });
}

export const getUser = async (id: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
        include: {
            events: true,
            notes: true,
            enrolledIn: true,
            courses: true,
            sentMessages: true,
        },
    });
}

export const createUser = async (user: Omit<User, "id" | "events" | "notes" | "enrolledIn" | "courses" | "sentMessages">): Promise<User> => {
    const { name, email, password, image, role } = user;
    return db.user.create({
        data: {
            name,
            email,
            password,
            image,
            role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            image: true,
            role: true,
        }
    });
}

export const updateUser = async (user: Omit<User, "id" | "events" | "notes" | "enrolledIn" | "courses" | "sentMessages">, id: string): Promise<User> => {
    const { name, email, password, image, role } = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            name,
            email,
            password,
            image,
            role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            image: true,
            role: true,
        }
    });
}

export const deleteUser = async (id: string) : Promise<void> => {
    await db.user.delete({
        where: {
            id,
        }
    })
}