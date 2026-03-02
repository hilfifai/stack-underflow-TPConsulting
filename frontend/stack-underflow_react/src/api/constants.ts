// ========================= QUERY KEYS =========================
export const QUERY_KEYS = {
  // Auth
  AUTH: () => ["auth"] as const,
  AUTH_USER: () => [...QUERY_KEYS.AUTH(), "user"] as const,

  // Questions
  QUESTIONS: () => ["questions"] as const,
  QUESTION: (id: string) => [...QUERY_KEYS.QUESTIONS(), id] as const,

  // Comments
  COMMENTS: () => ["comments"] as const,
  COMMENTS_BY_QUESTION: (questionId: string) => [...QUERY_KEYS.COMMENTS(), questionId] as const,
  COMMENT: (id: string) => [...QUERY_KEYS.COMMENTS(), id] as const,
};
