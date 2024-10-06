export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  videoUrl?: string;
}

export interface Topic {
  id: string;
  name: string;
}