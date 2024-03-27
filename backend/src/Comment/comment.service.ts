import { Comment } from "@prisma/client";
import { db } from "../utils/db.server";

export const createComment = async (content: string, authorId: string, postId: string): Promise<Comment> => {
    return db.comment.create({
        data: {
            content,
            author: { connect: { id: authorId } },
            post: { connect: { id: postId } }
        }
    });
}

export const getComment = async (commentId: string): Promise<Comment | null> => {
    return db.comment.findUnique({
        where: {
            id: commentId
        }
    });
}

export const listAllComments = async (): Promise<Comment[]> => {
    return db.comment.findMany();
}

export const updateComment = async (commentId: string, content: string): Promise<Comment | null> => {
    return db.comment.update({
        where: {
            id: commentId
        },
        data: {
            content
        }
    });
}

export const deleteComment = async (commentId: string): Promise<void> => {
    await db.comment.delete({
        where: {
            id: commentId
        }
    });
}