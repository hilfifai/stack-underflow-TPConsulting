import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, updateComment } from "#src/api/comments";
import type { Comment } from "#src/types";
import { ApiError } from "#src/api/types";
import { QUERY_KEYS } from "#src/api/constants";

export function useComments() {
  const queryClient = useQueryClient();

  // ========================= MUTATIONS =========================
  const addCommentMutation = useMutation({
    mutationFn: (data: {
      questionId: string;
      content: string;
      userId: string;
      username: string;
    }) => addComment(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTION(variables.questionId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENTS_BY_QUESTION(variables.questionId) });
    },
    onError: (error: ApiError) => {
      console.error("[useComments] Add error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: (data: {
      questionId: string;
      commentId: string;
      content: string;
      userId: string;
    }) => updateComment(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTION(variables.questionId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENTS_BY_QUESTION(variables.questionId) });
    },
    onError: (error: ApiError) => {
      console.error("[useComments] Update error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  return {
    addCommentMutation,
    updateCommentMutation,
  };
}
