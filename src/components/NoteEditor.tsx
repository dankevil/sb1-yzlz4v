import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import YouTube from 'react-youtube';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote, onDeleteNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags.join(', '));
  const [videoUrl, setVideoUrl] = useState(note.videoUrl || '');

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.join(', '));
    setVideoUrl(note.videoUrl || '');
  }, [note]);

  const handleSave = () => {
    onUpdateNote(note.id, {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      videoUrl: videoUrl || undefined,
    });
  };

  const getYoutubeVideoId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-bold w-full bg-transparent text-white neon-glow"
          placeholder="Note Title"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDeleteNote(note.id)}
            className="text-pink-400 hover:text-pink-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-2 border rounded bg-purple-800 text-white border-purple-600 resize-none"
        placeholder="Note content..."
      />
      <div className="mt-2">
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-1 border rounded bg-purple-800 text-white border-purple-600"
          placeholder="Tags (comma-separated)"
        />
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-1 border rounded bg-purple-800 text-white border-purple-600"
          placeholder="YouTube Video URL"
        />
      </div>
      {videoUrl && (
        <div className="mt-2">
          <YouTube videoId={getYoutubeVideoId(videoUrl) || ''} opts={{ width: '100%', height: '200' }} />
        </div>
      )}
    </div>
  );
};