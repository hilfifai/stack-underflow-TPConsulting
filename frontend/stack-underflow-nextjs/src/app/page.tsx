"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import QuestionList from "@/components/QuestionList";
import { getAll } from "@/api/questions";
import type { Question } from "@/types";
import { t, type Locale } from "@/i18n";

export default function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale: Locale = "en";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAll();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <>
        <Header locale={locale} />
        <main>
          <p>{t("common.loading", locale)}</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header locale={locale} />
        <main>
          <div className="error-message">{error}</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header locale={locale} />
      <main>
        <QuestionList questions={questions} locale={locale} />
      </main>
    </>
  );
}
