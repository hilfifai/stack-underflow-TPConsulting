type TFunction = (key: string, options?: { count?: number }) => string;

export function formatDate(date: Date, t: TFunction): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return t("date.justNow");
  if (diffMins < 60) return t(diffMins === 1 ? "date.minuteAgo" : "date.minutesAgo", { count: diffMins });
  if (diffHours < 24) return t(diffHours === 1 ? "date.hourAgo" : "date.hoursAgo", { count: diffHours });
  if (diffDays < 7) return t(diffDays === 1 ? "date.dayAgo" : "date.daysAgo", { count: diffDays });

  return date.toLocaleDateString(t("header.questions") === "Questions" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
