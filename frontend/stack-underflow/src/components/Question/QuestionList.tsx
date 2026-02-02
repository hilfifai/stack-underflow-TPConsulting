import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { dataStore } from "#src/store/dataStore";
import { formatDate } from "#src/utils/formatDate";
import type { Question, QuestionStatus } from "#src/types";
import { useTranslation } from "react-i18next";

interface QuestionListProps {
  questions?: Question[];
}

const ITEMS_PER_PAGE = 10;

export function QuestionList({ questions: propQuestions }: QuestionListProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // useRef: Create a reference to the search input element
  // This allows us to directly access and manipulate the DOM element without causing re-renders
  const searchInputRef = useRef<HTMLInputElement>(null);

  // useEffect: Focus the search input when the component mounts
  // This runs once after the initial render, improving user experience by automatically focusing the search field
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // useEffect: Reset to page 1 when search query or status filter changes
  // This ensures users always see the first page of results when applying new filters
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Use prop questions if provided, otherwise get from dataStore
  const allQuestions = propQuestions || dataStore.getQuestions();

  // Filter questions based on search query and status
  let filteredQuestions = searchQuery
    ? dataStore.searchQuestions(searchQuery)
    : allQuestions;

  // Apply status filter
  if (statusFilter !== "all") {
    filteredQuestions = filteredQuestions.filter((q) => q.status === statusFilter);
  }

  // Calculate pagination
  const totalQuestions = filteredQuestions.length;
  const totalPages = Math.ceil(totalQuestions / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Reset to page 1 when search query or filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (status: QuestionStatus | "all") => {
    setStatusFilter(status);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="question-list">
      <div className="question-list-header">
        <h2>{t("questionList.title")}</h2>
        <Link to="/questions/new" className="btn-primary">
          {t("questionList.askQuestion")}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={t("questionList.searchPlaceholder")}
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          ref={searchInputRef}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
            }}
            className="search-clear"
          >
            ✕
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="status-filter">
        <button
          onClick={() => handleStatusFilterChange("all")}
          className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
        >
          {t("questionList.filterAll")}
        </button>
        <button
          onClick={() => handleStatusFilterChange("open")}
          className={`filter-btn ${statusFilter === "open" ? "active" : ""}`}
        >
          {t("questionDetail.status.open")}
        </button>
        <button
          onClick={() => handleStatusFilterChange("answered")}
          className={`filter-btn ${statusFilter === "answered" ? "active" : ""}`}
        >
          {t("questionDetail.status.answered")}
        </button>
        <button
          onClick={() => handleStatusFilterChange("closed")}
          className={`filter-btn ${statusFilter === "closed" ? "active" : ""}`}
        >
          {t("questionDetail.status.closed")}
        </button>
      </div>

      {/* Results count */}
      {(searchQuery || statusFilter !== "all") && (
        <div className="search-results-count">
          {searchQuery && statusFilter !== "all"
            ? t("questionList.searchAndFilterResults", {
                count: totalQuestions,
                query: searchQuery,
                status: t(`questionDetail.status.${statusFilter}`),
              })
            : searchQuery
            ? t("questionList.searchResults", {
                count: totalQuestions,
                query: searchQuery,
              })
            : t("questionList.filterResults", {
                count: totalQuestions,
                status: t(`questionDetail.status.${statusFilter}`),
              })}
        </div>
      )}

      <div className="questions">
        {displayedQuestions.length === 0 ? (
          <p className="no-questions">
            {searchQuery
              ? t("questionList.noSearchResults")
              : t("questionList.noQuestions")}
          </p>
        ) : (
          displayedQuestions.map((question) => (
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
                  {t("questionList.by")} {question.username}
                </span>
                <span className="question-date">
                  {formatDate(question.createdAt, t)}
                </span>
                <span className="question-comments">
                  {question.comments.length} {question.comments.length === 1 ? t("questionList.comment") : t("questionList.comments")}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            {t("questionList.previous")}
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current, and adjacent pages
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-number ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              // Show ellipsis for gaps
              if (
                (page === currentPage - 2 && page > 1) ||
                (page === currentPage + 2 && page < totalPages)
              ) {
                return <span key={page} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            {t("questionList.next")}
          </button>
        </div>
      )}
    </div>
  );
}
