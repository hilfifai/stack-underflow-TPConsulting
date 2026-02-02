import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { useAuth } from "#src/store/AuthContext";
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

  const question = id ? dataStore.getQuestionById(id) : undefined;

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
  };

  const handleSave = () => {
    if (user) {
      dataStore.updateQuestion(
        question.id,
        editTitle,
        editDescription,
        editStatus,
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (user && newComment.trim()) {
      dataStore.addComment(
        question.id,
        newComment,
        user.id,
        user.username,
      );
      setNewComment("");
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleSaveComment = () => {
    if (editingCommentId && editCommentContent.trim()) {
      dataStore.updateComment(question.id, editingCommentId, editCommentContent);
      setEditingCommentId(null);
      setEditCommentContent("");
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentContent("");
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
    <div className="question-detail">
      <Link to="/" className="back-link">
        {t("questionDetail.backLink")}
      </Link>

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
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-description">{t("questionDetail.descriptionLabel")}</label>
            <textarea
              id="edit-description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={5}
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
            >
              <option value="open">{t("questionDetail.status.open")}</option>
              <option value="answered">{t("questionDetail.status.answered")}</option>
              <option value="closed">{t("questionDetail.status.closed")}</option>
            </select>
          </div>
          <div className="form-actions">
            <button onClick={handleSave} className="btn-primary">
              {t("questionDetail.save")}
            </button>
            <button onClick={handleCancel} className="btn-secondary">
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
            />
            <button
              onClick={handleAddComment}
              className="btn-primary"
              disabled={!newComment.trim()}
            >
              {t("questionDetail.addComment")}
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
                      />
                      <div className="comment-actions">
                        <button
                          onClick={handleSaveComment}
                          className="btn-primary"
                        >
                          {t("questionDetail.save")}
                        </button>
                        <button
                          onClick={handleCancelEditComment}
                          className="btn-secondary"
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
  );
}
