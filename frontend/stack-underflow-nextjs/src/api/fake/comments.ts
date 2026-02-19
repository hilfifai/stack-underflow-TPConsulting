// ========================= FAKE COMMENTS API =========================

import type { Comment } from "@/types";
import { validateComment, ValidationError } from "../types";

const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

// Store comments separately for easier management
let comments: Comment[] = [
  {
    id: "c1",
    questionId: "q1",
    userId: "user_2",
    username: "john_doe",
    content: "You can use ref() and computed() from vue",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

export const getByQuestionId = async (questionId: string): Promise<Comment[]> => {
  await delay(100 + Math.random() * 200);
  
  const questionComments = comments.filter((c) => c.questionId === questionId);
  console.log("[Fake API] Get comments for question:", questionId, questionComments.length);
  return questionComments;
};

export const create = async (data: { questionId: string; content: string }): Promise<Comment> => {
  await delay(200 + Math.random() * 300);
  
  validateComment(data.content);
  
  const comment: Comment = {
    id: `c_${Date.now()}`,
    questionId: data.questionId,
    userId: "user_1",
    username: "admin",
    content: data.content.trim(),
    createdAt: new Date().toISOString(),
  };
  
  comments.push(comment);
  console.log("[Fake API] Create comment:", comment);
  return comment;
};

export const deleteComment = async (id: string): Promise<void> => {
  await delay(100 + Math.random() * 200);
  
  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) {
    throw ValidationError.COMMENT_NOT_FOUND.message;
  }
  
  comments.splice(index, 1);
  console.log("[Fake API] Delete comment:", id);
};

export const mockComments = comments;
