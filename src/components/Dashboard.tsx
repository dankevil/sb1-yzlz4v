import React, { useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { NoteList } from './NoteList';
import { NoteEditor } from './NoteEditor';
import { useNotes } from '../hooks/useNotes';
import { useTopics } from '../hooks/useTopics';
import { Search } from './Search';
import { DarkModeToggle } from './DarkModeToggle';
import { GridLayout } from './GridLayout';
import { Note } from '../types';

export const Dashboard: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const { topics } = useTopics();

  const filteredNotes = notes.filter((note) => {
    const matchesTopic = !selectedTopic || note.topic === selectedTopic;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => note.tags.includes(tag));
    return matchesTopic && matchesSearch && matchesTags;
  });

  const handleAddNote = useCallback(() => {
    const newNote = addNote({ title: 'New Note', content: '', topic: selectedTopic || 'Uncategorized', tags: [] });
    setSelectedNote(newNote.id);
  }, [addNote, selectedTopic]);

  const handleUpdateNote = useCallback((id: string, updates: Partial<Note>) => {
    updateNote(id, updates);
  }, [updateNote]);

  const handleDeleteNote = useCallback((id: string) => {
    deleteNote(id);
    setSelectedNote(null);
  }, [deleteNote]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 to-purple-700">
      <Sidebar
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-purple-800">
          <Search onSearch={setSearchTerm} />
          <DarkModeToggle />
        </div>
        <div className="flex-1 flex overflow-hidden">
          <NoteList
            notes={filteredNotes}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
            onAddNote={handleAddNote}
            onSelectTag={(tag) => setSelectedTags(prev => [...prev, tag])}
            selectedTags={selectedTags}
          />
          <div className="flex-1 overflow-auto p-4">
            <GridLayout
              notes={filteredNotes}
              onSelectNote={setSelectedNote}
              selectedNote={selectedNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};