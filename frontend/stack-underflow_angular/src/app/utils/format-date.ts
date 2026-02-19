import { I18nService } from '../services/i18n.service';

export function formatDate(date: Date, i18nService: I18nService): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const t = (key: string) => i18nService.t(key);

  if (diffSeconds < 60) {
    return t('date.justNow');
  } else if (diffMinutes < 60) {
    if (diffMinutes === 1) {
      return t('date.minuteAgo').replace('{{count}}', '1');
    }
    return t('date.minutesAgo').replace('{{count}}', diffMinutes.toString());
  } else if (diffHours < 24) {
    if (diffHours === 1) {
      return t('date.hourAgo').replace('{{count}}', '1');
    }
    return t('date.hoursAgo').replace('{{count}}', diffHours.toString());
  } else if (diffDays < 7) {
    if (diffDays === 1) {
      return t('date.dayAgo').replace('{{count}}', '1');
    }
    return t('date.daysAgo').replace('{{count}}', diffDays.toString());
  }

  return date.toLocaleDateString(i18nService.locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
