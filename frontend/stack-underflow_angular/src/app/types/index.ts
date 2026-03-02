export type QuestionStatus = 'open' | 'answered' | 'closed';

export interface User {
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  questionId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
  username: string;
  createdAt: Date;
  comments: Comment[];
}
