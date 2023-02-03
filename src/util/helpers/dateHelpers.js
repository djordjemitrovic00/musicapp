import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import i18next from 'i18next';

export function formatDate(date, fmt = 'MM/dd/y', locale = enUS) {
  const dt = new Date(date);
  return format(dt, fmt, { locale });
}

export function formatDateTime(date) {
  const dt = new Date(date);
  return format(dt, 'MM/dd/y hh:mm aa');
}

export function getDateDay(date) {
  const dt = new Date(date);
  return format(dt, 'dd');
}

export function getDateMonth(date) {
  const dt = new Date(date);
  return format(dt, 'MM');
}

export function getDateYear(date) {
  const dt = new Date(date);
  return format(dt, 'y');
}

export function formatDateTimeLocale(date) {
  const dt = new Date(date);
  return format(dt, 'MM/dd/y hh:mm aa');
}

// TODO add locale
export function formatDateRange(dates) {
  const start = formatDate(dates.start);
  const end = formatDate(dates.end);
  return i18next.t('common.date.range', { start, end });
}
