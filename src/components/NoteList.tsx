import React from 'react';
import { PlusCircle, File, Tag } from 'lucide-react';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  selectedNote: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onSelectTag: (tag: string) => void;
  selectedTags: string[];
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onAddNote,
  onSelectTag,
  selectedTags,
}) => {
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Notes</h2>
        <button
          onClick={onAddNote}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2 dark:text-gray-300">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-2 py-1 text-xs rounded ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <Tag className="inline-block w-3 h-3 mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`flex items-center w-full text-left p-2 rounded ${
              selectedNote === note.id
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <File className="mr-2 h-4 w-4 dark:text-gray-400" />
            <span className="truncate dark:text-white">{note.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};