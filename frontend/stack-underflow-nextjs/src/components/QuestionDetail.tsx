"use client";

import { useState } from "react";
import Link from "next/link";
import { formatFullDate } from "@/utils/formatDate";
import { t, type Locale } from "@/i18n";
import type { Question, Comment } from "@/types";
import { create as createComment, deleteComment as deleteCommentApi } from "@/api/comments";
import { update as updateQuestion, deleteQuestion as deleteQuestionApi } from "@/api/questions";

interface QuestionDetailProps {
  question: Question;
  locale?: Locale;
  isOwner?: boolean;
}

export default function QuestionDetail({ question, locale = "en", isOwner = false }: QuestionDetailProps) {
  const [comments, setComments] = useState<Comment[]>(question.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const comment = await createComment({ questionId: question.id, content: newComment });
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setLoading(true);
    try {
      await deleteCommentApi(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAnswered = async () => {
    setLoading(true);
    try {
      await updateQuestion(question.id, { status: "answered" });
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update question");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    setLoading(true);
    try {
      await deleteQuestionApi(question.id);
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-detail">
      <div className="question-header">
        <h1>{question.title}</h1>
        <div className="question-meta">
          <span className={`status-badge status-${question.status}`}>
            {t(`questions.status.${question.status}`, locale)}
          </span>
          <span>Asked by {question.username}</span>
          <span>{formatFullDate(question.createdAt)}</span>
        </div>
      </div>

      <div className="question-body">
        <p>{question.description}</p>
      </div>

      {isOwner && (
        <div className="question-actions">
          {question.status === "open" && (
            <button onClick={handleMarkAnswered} className="btn-secondary" disabled={loading}>
              Mark as Answered
            </button>
          )}
          <button onClick={handleDeleteQuestion} className="btn-danger" disabled={loading}>
            {t("questions.delete", locale)}
          </button>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        
        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-content">
                  <p>{comment.content}</p>
                  <div className="comment-meta">
                    <span>{comment.username}</span>
                    <span>{formatFullDate(comment.createdAt)}</span>
                    {isOwner && (
                      <button onClick={() => handleDeleteComment(comment.id)} className="btn-delete">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">{t("comments.no_comments", locale)}</p>
        )}

        <form onSubmit={handleAddComment} className="comment-form">
          <h4>{t("comments.add", locale)}</h4>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("comments.placeholder", locale)}
            rows={3}
            required
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading || !newComment.trim()}>
            {loading ? t("common.loading", locale) : t("comments.submit", locale)}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
