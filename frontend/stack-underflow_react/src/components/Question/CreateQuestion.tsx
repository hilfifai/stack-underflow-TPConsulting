import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "#src/store/AuthContext";
import { useQuestions } from "#src/hooks/useQuestions";
import { ApiError } from "#src/api/types";
import { useTranslation } from "../../../node_modules/react-i18next";

export function CreateQuestion() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { createQuestionMutation } = useQuestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError(t("createQuestion.error.notLoggedIn"));
      return;
    }

    createQuestionMutation.mutate(
      {
        title,
        description,
        userId: user.id,
        username: user.username,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (err: ApiError) => {
          // Map error codes to user-friendly messages
          const errorMessages: Record<string, string> = {
            TITLE_REQUIRED: t("createQuestion.error.titleRequired"),
            TITLE_TOO_SHORT: t("createQuestion.error.titleTooShort"),
            TITLE_TOO_LONG: t("createQuestion.error.titleTooLong"),
            DESCRIPTION_REQUIRED: t("createQuestion.error.descriptionRequired"),
            DESCRIPTION_TOO_SHORT: t("createQuestion.error.descriptionTooShort"),
            DESCRIPTION_TOO_LONG: t("createQuestion.error.descriptionTooLong"),
          };

          setError(errorMessages[err.code] || err.message);

          // Log error for debugging
          console.error("[CreateQuestion] Error:", {
            code: err.code,
            message: err.message,
            details: err.details,
            timestamp: new Date().toISOString(),
          });
        },
      }
    );
  };

  return (
    <div className="create-question">
      <div className="create-question-card">
        <h1>{t("createQuestion.title")}</h1>
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label htmlFor="title">{t("createQuestion.titleLabel")}</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("createQuestion.titlePlaceholder")}
              required
              disabled={createQuestionMutation.isPending}
            />
            <small className="form-hint">
              {t("createQuestion.titleHint")}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="description">{t("createQuestion.descriptionLabel")}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("createQuestion.descriptionPlaceholder")}
              rows={6}
              required
              disabled={createQuestionMutation.isPending}
            />
            <small className="form-hint">
              {t("createQuestion.descriptionHint")}
            </small>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={createQuestionMutation.isPending}
            >
              {createQuestionMutation.isPending
                ? t("createQuestion.submitting")
                : t("createQuestion.postQuestion")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
              disabled={createQuestionMutation.isPending}
            >
              {t("createQuestion.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
