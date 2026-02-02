import { Link } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { formatDate } from "#src/utils/formatDate";
import type { Question } from "#src/types";

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
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
    <div className="question-list">
      <div className="question-list-header">
        <h2>Questions</h2>
        <Link to="/questions/new" className="btn-primary">
          Ask Question
        </Link>
      </div>
      <div className="questions">
        {questions.length === 0 ? (
          <p className="no-questions">No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((question) => (
            <Link
              key={question.id}
              to={`/questions/${question.id}`}
              className="question-card"
            >
              <div className="question-header">
                <h3 className="question-title">{question.title}</h3>
                <span
                  className={`status-badge ${getStatusColor(question.status)}`}
                >
                  {question.status}
                </span>
              </div>
              <p className="question-description">{question.description}</p>
              <div className="question-meta">
                <span className="question-author">
                  by {question.username}
                </span>
                <span className="question-date">
                  {formatDate(question.createdAt)}
                </span>
                <span className="question-comments">
                  {question.comments.length} comment
                  {question.comments.length !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
