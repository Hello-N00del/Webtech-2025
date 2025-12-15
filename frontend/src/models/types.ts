// frontend/src/models/types.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Infoletter {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  category: string;
  replies: number;
  views: number;
}
