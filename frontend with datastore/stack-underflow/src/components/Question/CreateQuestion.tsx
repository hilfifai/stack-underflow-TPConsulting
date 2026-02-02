import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { useAuth } from "#src/store/AuthContext";
import { useTranslation } from "react-i18next";

export function CreateQuestion() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && title.trim() && description.trim()) {
      dataStore.createQuestion(title, description, user.id, user.username);
      navigate("/");
    }
  };

  return (
    <div className="create-question">
      <div className="create-question-card">
        <h1>{t("createQuestion.title")}</h1>
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
            />
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
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {t("createQuestion.postQuestion")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
            >
              {t("createQuestion.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
