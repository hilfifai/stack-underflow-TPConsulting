"use client";

import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { t, type Locale } from "@/i18n";
import type { Question } from "@/types";

interface QuestionListProps {
  questions: Question[];
  locale?: Locale;
}

export default function QuestionList({ questions, locale = "en" }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <p>No questions yet. Be the first to ask!</p>
      </div>
    );
  }

  return (
    <div className="question-list">
      {questions.map((question) => (
        <div key={question.id} className="question-card">
          <Link href={`/questions/${question.id}`} className="question-link">
            <h2 className="question-title">{question.title}</h2>
          </Link>
          
          <p className="question-description">
            {question.description.length > 150
              ? `${question.description.substring(0, 150)}...`
              : question.description}
          </p>
          
          <div className="question-meta">
            <span className={`status-badge status-${question.status}`}>
              {t(`questions.status.${question.status}`, locale)}
            </span>
            
            <span className="question-author">
              Asked by {question.username}
            </span>
            
            <span className="question-date">
              {formatDate(question.createdAt)}
            </span>
            
            <span className="question-comments">
              {question.comments?.length || 0} comments
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
