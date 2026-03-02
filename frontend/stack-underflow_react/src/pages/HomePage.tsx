import { useQuestions } from "#src/hooks/useQuestions";
import { QuestionList } from "#src/components/Question/QuestionList";

export function HomePage() {
  const { questions, loading, error } = useQuestions();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading questions</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return <QuestionList questions={questions || []} />;
}
