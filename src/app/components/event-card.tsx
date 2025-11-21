'use client';
import { EventsQuery } from '@/app/api/graphql/types/client/graphql';
import { Badge } from '@/app/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/app/components/ui/card';
import {
  formatEventAddress,
  formatEventDate,
  formatEventTime,
  tagLabels,
  tagColors,
} from '@/app/lib/formatting';
import { isThisWeek, isToday, spansMultipleDays } from '@/app/lib/utils';
import clsx from 'clsx';
import {
  Calendar,
  Clock,
  Coins,
  Info,
  MapPin,
  MapPinned,
  Sparkles,
} from 'lucide-react';

type EventCardProps = { event: EventsQuery['events'][number] };

export function EventCard(props: EventCardProps) {
  const { event } = props;
  const today = isToday(event.startTime, event.endTime);
  const thisWeek = isThisWeek(event.startTime, event.endTime);
  const address = formatEventAddress(event.location);
  return (
    <Card className="w-full max-w-3xl gap-5 overflow-hidden rounded-3xl border-0 pt-0 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl">
      {/* Header */}
      <div
        className={clsx(
          'flex items-center justify-between overflow-hidden bg-linear-to-r px-6 py-3',
          today && 'from-amber-200 via-orange-200 to-pink-200',
          !today && thisWeek && 'from-violet-200 via-purple-200 to-fuchsia-200',
          !today && !thisWeek && 'from-indigo-200 via-blue-200 to-cyan-200',
        )}
      >
        <div className="flex gap-2">
          <Clock className="h4 w-4" />
          <span>{formatEventDate(event.startTime, event.endTime)}</span>
          {!spansMultipleDays(event.startTime, event.endTime) && (
            <>
              <span>•</span>
              <span>{formatEventTime(event.startTime, event.endTime)}</span>
            </>
          )}
        </div>
        <div className="flex gap-2 rounded-full bg-white/60 px-3 py-1">
          <MapPin className="h4 w-4" />
          {event.location.city}
        </div>
      </div>
      {/* Body */}
      <CardContent>
        {/* badges */}
        <div className="mb-2 flex gap-2">
          {today && (
            <Badge className="bg-amber-200 text-amber-900">
              <Sparkles />
              Heute
            </Badge>
          )}
          {!today && thisWeek && (
            <Badge className="bg-violet-200 text-violet-900">
              <Calendar />
              Diese Woche
            </Badge>
          )}
          {event.tags.map((tag) => (
            <Badge className={clsx(tagColors[tag], 'text-white')} key={tag}>
              {tagLabels[tag]}
            </Badge>
          ))}
        </div>
        <CardTitle className="mb-1 text-2xl">{event.title}</CardTitle>
        <p>{event.description}</p>
      </CardContent>
      {/* Footer */}
      <CardFooter className="flex gap-4 text-sm">
        {event.price && (
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4" />
            <p>{`CHF ${event.price}`}</p>
          </div>
        )}
        {event.hyperlink && (
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <a
              className="underline underline-offset-2"
              target="_blank"
              href={event.hyperlink}
            >
              mehr Infos
            </a>
          </div>
        )}
        <div className="flex items-center gap-1">
          <MapPinned className="h-4 w-4" />
          <a
            className="underline underline-offset-2"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${address}`}
          >
            {event.location.name}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
