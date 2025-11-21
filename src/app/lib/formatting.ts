import { Tag } from '@/app/api/graphql/types/client/graphql';
import { Location } from '@/app/api/graphql/types/graphql';

export function formatEventAddress(location: Location) {
  return `${location.name}, ${location.address}, ${location.zipCode} ${location.city}`;
}

export function formatEventDate(
  startTime: string,
  endTime?: string | null,
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const startDate = new Date(startTime).toLocaleDateString(
    'de-CH',
    formatOptions,
  );
  const endDate = endTime
    ? new Date(endTime).toLocaleDateString('de-CH', formatOptions)
    : '';
  const dateRange =
    endDate && startDate != endDate ? startDate + ' - ' + endDate : startDate;
  return dateRange;
}

export function formatEventTime(
  startTime: string,
  endTime?: string | null,
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const start = new Date(startTime).toLocaleTimeString('de-CH', formatOptions);
  const end = endTime
    ? new Date(endTime).toLocaleTimeString('de-CH', formatOptions)
    : '';
  const timeRange = end ? start + ' - ' + end : start;
  return timeRange;
}

export const tagLabels: Record<Tag, string> = {
  [Tag.Party]: 'Party',
  [Tag.Workshop]: 'Workshop',
};

export const tagColors: Record<Tag, string> = {
  [Tag.Party]: 'bg-fuchsia-400',
  [Tag.Workshop]: 'bg-indigo-400',
};
