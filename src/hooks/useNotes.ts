import { create } from 'zustand';
import { Note } from '../types';

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useNotes = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) => {
    const newNote = { ...note, id: Date.now().toString() };
    set((state) => ({ notes: [...state.notes, newNote] }));
    return newNote;
  },
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));