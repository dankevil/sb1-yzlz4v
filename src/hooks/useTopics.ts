import { create } from 'zustand';
import { Topic } from '../types';

interface TopicsState {
  topics: Topic[];
  addTopic: (name: string) => void;
  updateTopic: (id: string, name: string) => void;
  deleteTopic: (id: string) => void;
}

export const useTopics = create<TopicsState>((set) => ({
  topics: [],
  addTopic: (name) =>
    set((state) => ({
      topics: [...state.topics, { id: Date.now().toString(), name }],
    })),
  updateTopic: (id, name) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === id ? { ...topic, name } : topic
      ),
    })),
  deleteTopic: (id) =>
    set((state) => ({
      topics: state.topics.filter((topic) => topic.id !== id),
    })),
}));