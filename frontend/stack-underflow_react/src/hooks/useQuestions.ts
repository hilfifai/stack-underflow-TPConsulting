import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQuestions,
  fetchQuestionById,
  createQuestion,
  updateQuestion,
} from "#src/api/questions";
import type { Question, QuestionStatus } from "#src/types";
import { ApiError } from "#src/api/types";
import { QUERY_KEYS } from "#src/api/constants";

export function useQuestions(questionId?: string) {
  const queryClient = useQueryClient();

  // ========================= QUERIES =========================
  const {
    data: questions = [],
    isLoading,
    error,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: QUERY_KEYS.QUESTIONS(),
    queryFn: () => fetchQuestions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const {
    data: question,
    isLoading: isQuestionLoading,
    error: questionError,
    refetch: refetchQuestion,
  } = useQuery({
    queryKey: QUERY_KEYS.QUESTION(questionId || ""),
    queryFn: () => fetchQuestionById(questionId || ""),
    enabled: !!questionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ========================= MUTATIONS =========================
  const createQuestionMutation = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      userId: string;
      username: string;
    }) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS() });
    },
    onError: (error: ApiError) => {
      console.error("[useQuestions] Create error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      description: string;
      status: QuestionStatus;
      userId: string;
    }) => updateQuestion(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTIONS() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUESTION(variables.id) });
    },
    onError: (error: ApiError) => {
      console.error("[useQuestions] Update error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  // ========================= METHODS =========================
  const getQuestion = async (id: string): Promise<Question> => {
    try {
      return await fetchQuestionById(id);
    } catch (error) {
      console.error(`Error fetching question ${id}:`, error);
      throw error;
    }
  };

  return {
    questions,
    loading: isLoading,
    error,
    total: questions?.length || 0,
    refetchQuestions,

    question,
    isQuestionLoading,
    questionError,
    refetchQuestion,

    createQuestionMutation,
    updateQuestionMutation,

    getQuestion,
  };
}
