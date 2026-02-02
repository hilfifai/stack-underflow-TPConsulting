import { dataStore } from "#src/store/dataStore";
import { QuestionList } from "#src/components/Question/QuestionList";

export function HomePage() {
  const questions = dataStore.getQuestions();

  return <QuestionList questions={questions} />;
}
