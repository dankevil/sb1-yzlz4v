import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Note } from '../types';
import { NoteEditor } from './NoteEditor';
import { Edit2, Trash2 } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  notes: Note[];
  onSelectNote: (id: string) => void;
  selectedNote: string | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  notes,
  onSelectNote,
  selectedNote,
  onUpdateNote,
  onDeleteNote
}) => {
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const layout = notes.map((note, index) => ({
    i: note.id,
    x: (index % 3) * 4,
    y: Math.floor(index / 3) * 4,
    w: 4,
    h: 4,
    minW: 2,
    minH: 2,
  }));

  const handleNoteClick = (id: string) => {
    if (editingNote === id) {
      setEditingNote(null);
    } else {
      setEditingNote(id);
      onSelectNote(id);
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditingNote(id);
    onSelectNote(id);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteNote(id);
  };

  const handleNoteUpdate = (id: string, updates: Partial<Note>) => {
    onUpdateNote(id, updates);
    setEditingNote(null);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
    >
      {notes.map((note) => (
        <div
          key={note.id}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
            editingNote === note.id
              ? 'bg-purple-800 neon-border scale-105 z-10'
              : 'bg-purple-900 hover:bg-purple-800'
          }`}
          onClick={() => handleNoteClick(note.id)}
        >
          {editingNote === note.id ? (
            <NoteEditor
              note={note}
              onUpdateNote={handleNoteUpdate}
              onDeleteNote={onDeleteNote}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold neon-glow text-white">{note.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleEditClick(e, note.id)}
                    className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(e, note.id)}
                    className="text-pink-400 hover:text-pink-300 transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300">{note.content.substring(0, 100)}...</p>
            </>
          )}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};