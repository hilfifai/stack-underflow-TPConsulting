import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { useAuth } from "#src/store/AuthContext";

export function CreateQuestion() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question?"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about your question..."
              rows={6}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Post Question
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
