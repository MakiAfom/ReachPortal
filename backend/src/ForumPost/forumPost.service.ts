import { ForumPost } from "@prisma/client";
import { db } from "../utils/db.server";

export const createForumPost = async (title: string, content: string, image: string, authorId: string): Promise<ForumPost> => {
    return db.forumPost.create({
        data: {
            title,
            content,
            image,
            author: { connect: { id: authorId } }
        }
    });
}

export const getForumPost = async (postId: string): Promise<ForumPost | null> => {
    return db.forumPost.findUnique({
        where: {
            id: postId
        }
    });
}

export const listForumPosts = async (): Promise<ForumPost[]> => {
    return db.forumPost.findMany();
}

export const updateForumPost = async (postId: string, title: string, content: string, image: string): Promise<ForumPost | null> => {
    return db.forumPost.update({
        where: {
            id: postId
        },
        data: {
            title,
            content,
            image
        }
    });
}

export const deleteForumPost = async (postId: string): Promise<void> => {
    await db.forumPost.delete({
        where: {
            id: postId
        }
    });
}