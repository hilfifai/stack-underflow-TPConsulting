import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { useAuth } from "#src/store/AuthContext";
import { useQuestions } from "#src/hooks/useQuestions";
import { useComments } from "#src/hooks/useComments";
import { ApiError } from "#src/api/types";
import { formatDate } from "#src/utils/formatDate";
import type { QuestionStatus } from "#src/types";
import { useTranslation } from "react-i18next";

export function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<QuestionStatus>("open");
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { question, isQuestionLoading, questionError, updateQuestionMutation } = useQuestions(id);
  const { addCommentMutation, updateCommentMutation } = useComments();

  // Get related questions and hot network questions
  const relatedQuestions = id ? dataStore.getRelatedQuestions(id, 5) : [];
  const hotNetworkQuestions = dataStore.getHotNetworkQuestions(5);

  if (isQuestionLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading question...</p>
      </div>
    );
  }

  if (questionError) {
    return (
      <div className="error-container">
        <h2>Error loading question</h2>
        <p>{questionError.message}</p>
        <Link to="/" className="btn-primary">
          {t("questionDetail.backToQuestions")}
        </Link>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="not-found">
        <h2>{t("questionDetail.notFound")}</h2>
        <Link to="/" className="btn-primary">
          {t("questionDetail.backToQuestions")}
        </Link>
      </div>
    );
  }

  const canEdit = user && dataStore.canEditQuestion(question.id, user.id);

  const handleEdit = () => {
    setEditTitle(question.title);
    setEditDescription(question.description);
    setEditStatus(question.status);
    setIsEditing(true);
    setError(null);
  };

  const handleSave = () => {
    if (!user) return;

    updateQuestionMutation.mutate(
      {
        id: question.id,
        title: editTitle,
        description: editDescription,
        status: editStatus,
        userId: user.id,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setError(null);
        },
        onError: (err: ApiError) => {
          const errorMessages: Record<string, string> = {
            TITLE_REQUIRED: t("createQuestion.error.titleRequired"),
            TITLE_TOO_SHORT: t("createQuestion.error.titleTooShort"),
            TITLE_TOO_LONG: t("createQuestion.error.titleTooLong"),
            DESCRIPTION_REQUIRED: t("createQuestion.error.descriptionRequired"),
            DESCRIPTION_TOO_SHORT: t("createQuestion.error.descriptionTooShort"),
            DESCRIPTION_TOO_LONG: t("createQuestion.error.descriptionTooLong"),
            UNAUTHORIZED: t("questionDetail.error.unauthorized"),
          };

          setError(errorMessages[err.code] || err.message);

          console.error("[QuestionDetail] Update error:", {
            code: err.code,
            message: err.message,
            details: err.details,
            timestamp: new Date().toISOString(),
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleAddComment = () => {
    if (!user) return;

    addCommentMutation.mutate(
      {
        questionId: question.id,
        content: newComment,
        userId: user.id,
        username: user.username,
      },
      {
        onSuccess: () => {
          setNewComment("");
          setError(null);
        },
        onError: (err: ApiError) => {
          const errorMessages: Record<string, string> = {
            COMMENT_REQUIRED: t("questionDetail.error.commentRequired"),
            COMMENT_TOO_SHORT: t("questionDetail.error.commentTooShort"),
            COMMENT_TOO_LONG: t("questionDetail.error.commentTooLong"),
          };

          setError(errorMessages[err.code] || err.message);

          console.error("[QuestionDetail] Add comment error:", {
            code: err.code,
            message: err.message,
            details: err.details,
            timestamp: new Date().toISOString(),
          });
        },
      }
    );
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
    setError(null);
  };

  const handleSaveComment = () => {
    if (!user || !editingCommentId) return;

    updateCommentMutation.mutate(
      {
        questionId: question.id,
        commentId: editingCommentId,
        content: editCommentContent,
        userId: user.id,
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditCommentContent("");
          setError(null);
        },
        onError: (err: ApiError) => {
          const errorMessages: Record<string, string> = {
            COMMENT_REQUIRED: t("questionDetail.error.commentRequired"),
            COMMENT_TOO_SHORT: t("questionDetail.error.commentTooShort"),
            COMMENT_TOO_LONG: t("questionDetail.error.commentTooLong"),
            UNAUTHORIZED: t("questionDetail.error.unauthorized"),
          };

          setError(errorMessages[err.code] || err.message);

          console.error("[QuestionDetail] Update comment error:", {
            code: err.code,
            message: err.message,
            details: err.details,
            timestamp: new Date().toISOString(),
          });
        },
      }
    );
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentContent("");
    setError(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "status-open";
      case "answered":
        return "status-answered";
      case "closed":
        return "status-closed";
      default:
        return "";
    }
  };

  return (
    <div className="question-detail-layout">
      <div className="question-detail-main">
        <Link to="/" className="back-link">
          {t("questionDetail.backLink")}
        </Link>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {isEditing ? (
          <div className="edit-form">
            <h2>{t("questionDetail.editQuestion")}</h2>
            <div className="form-group">
              <label htmlFor="edit-title">{t("questionDetail.titleLabel")}</label>
              <input
                id="edit-title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                disabled={updateQuestionMutation.isPending}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">{t("questionDetail.descriptionLabel")}</label>
              <textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={5}
                disabled={updateQuestionMutation.isPending}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-status">{t("questionDetail.statusLabel")}</label>
              <select
                id="edit-status"
                value={editStatus}
                onChange={(e) =>
                  setEditStatus(e.target.value as QuestionStatus)
                }
                disabled={updateQuestionMutation.isPending}
              >
                <option value="open">{t("questionDetail.status.open")}</option>
                <option value="answered">{t("questionDetail.status.answered")}</option>
                <option value="closed">{t("questionDetail.status.closed")}</option>
              </select>
            </div>
            <div className="form-actions">
              <button
                onClick={handleSave}
                className="btn-primary"
                disabled={updateQuestionMutation.isPending}
              >
                {updateQuestionMutation.isPending
                  ? t("questionDetail.saving")
                  : t("questionDetail.save")}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary"
                disabled={updateQuestionMutation.isPending}
              >
                {t("questionDetail.cancel")}
              </button>
            </div>
          </div>
        ) : (
          <div className="question-content">
            <div className="question-header">
              <h1 className="question-title">{question.title}</h1>
              <span
                className={`status-badge ${getStatusColor(question.status)}`}
              >
                {question.status}
              </span>
            </div>
            <p className="question-description">{question.description}</p>
            <div className="question-meta">
              <span className="question-author">
                {t("questionDetail.askedBy")} {question.username}
              </span>
              <span className="question-date">
                {formatDate(question.createdAt, t)}
              </span>
              {canEdit && (
                <button onClick={handleEdit} className="btn-edit">
                  {t("questionDetail.edit")}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="comments-section">
          <h3>{t("questionDetail.comments")} ({question.comments.length})</h3>
          {user && (
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t("questionDetail.addCommentPlaceholder")}
                rows={3}
                disabled={addCommentMutation.isPending}
              />
              <button
                onClick={handleAddComment}
                className="btn-primary"
                disabled={!newComment.trim() || addCommentMutation.isPending}
              >
                {addCommentMutation.isPending
                  ? t("questionDetail.submitting")
                  : t("questionDetail.addComment")}
              </button>
            </div>
          )}
          <div className="comments-list">
            {question.comments.length === 0 ? (
              <p className="no-comments">{t("questionDetail.noComments")}</p>
            ) : (
              question.comments.map((comment) => {
                const canEditComment =
                  user && dataStore.canEditComment(comment.id, user.id);
                const isEditingThisComment = editingCommentId === comment.id;

                return (
                  <div key={comment.id} className="comment-card">
                    {isEditingThisComment ? (
                      <div className="edit-comment-form">
                        <textarea
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          rows={3}
                          disabled={updateCommentMutation.isPending}
                        />
                        <div className="comment-actions">
                          <button
                            onClick={handleSaveComment}
                            className="btn-primary"
                            disabled={updateCommentMutation.isPending}
                          >
                            {updateCommentMutation.isPending
                              ? t("questionDetail.saving")
                              : t("questionDetail.save")}
                          </button>
                          <button
                            onClick={handleCancelEditComment}
                            className="btn-secondary"
                            disabled={updateCommentMutation.isPending}
                          >
                            {t("questionDetail.cancel")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="comment-header">
                          <span className="comment-author">
                            {comment.username}
                          </span>
                          <span className="comment-date">
                            {formatDate(comment.createdAt, t)}
                          </span>
                          {canEditComment && (
                            <button
                              onClick={() =>
                                handleEditComment(comment.id, comment.content)
                              }
                              className="btn-edit-small"
                            >
                              {t("questionDetail.edit")}
                            </button>
                          )}
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="question-sidebar">
        {/* Related Questions */}
        {relatedQuestions.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              {t("questionDetail.relatedQuestions")}
            </h3>
            <ul className="sidebar-list">
              {relatedQuestions.map((q) => (
                <li key={q.id} className="sidebar-item">
                  <Link to={`/questions/${q.id}`} className="sidebar-link">
                    {q.title}
                  </Link>
                  <div className="sidebar-item-meta">
                    <span className="sidebar-comments">
                      {q.comments.length} {q.comments.length === 1 ? t("questionList.comment") : t("questionList.comments")}
                    </span>
                    <span className={`status-badge ${getStatusColor(q.status)} status-sm`}>
                      {q.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hot Network Questions */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            {t("questionDetail.hotNetworkQuestions")}
          </h3>
          <ul className="sidebar-list">
            {hotNetworkQuestions.map((q) => (
              <li key={q.id} className="sidebar-item">
                <Link to={`/questions/${q.id}`} className="sidebar-link">
                  {q.title}
                </Link>
                <div className="sidebar-item-meta">
                  <span className="sidebar-comments">
                    {q.comments.length} {q.comments.length === 1 ? t("questionList.comment") : t("questionList.comments")}
                  </span>
                  <span className={`status-badge ${getStatusColor(q.status)} status-sm`}>
                    {q.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
