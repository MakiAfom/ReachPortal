import express from "express";
import type { Request, Response } from "express";
import * as NoteService from "./note.service";

export const noteRouter = express.Router();

// POST: Create a new note
noteRouter.post("/", async (req: Request, res: Response) => {
    const { content, image, userId } = req.body;
    try {
        const newNote = await NoteService.createNote(content, image, userId);
        return res.status(201).json(newNote);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: Get a note by ID
noteRouter.get("/:noteId", async (req: Request, res: Response) => {
    const { noteId } = req.params;
    try {
        const note = await NoteService.getNote(noteId);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        return res.status(200).json(note);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: List all notes
noteRouter.get("/", async (req: Request, res: Response) => {
    try {
        const notes = await NoteService.listAllNotes();
        return res.status(200).json(notes);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT: Update a note by ID
noteRouter.put("/:noteId", async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { content, image } = req.body;
    try {
        const updatedNote = await NoteService.updateNote(noteId, content, image);
        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        return res.status(200).json(updatedNote);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete a note by ID
noteRouter.delete("/:noteId", async (req: Request, res: Response) => {
    const { noteId } = req.params;
    try {
        await NoteService.deleteNote(noteId);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});