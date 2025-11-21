'use client';

import { graphql } from '@/app/api/graphql/types/client';
import { EventCard } from '@/app/components/event-card';
import { useSuspenseQuery } from '@apollo/client/react';

const HOME_EVENTS = graphql(`
  query Events {
    events {
      id
      title
      description
      price
      startTime
      endTime
      contactEmail
      hyperlink
      tags
      location {
        name
        address
        zipCode
        city
      }
    }
  }
`);
// Todo: Style cards and table
// Todo: create styled skeleton
// Todo: Load additional events on scrollend
export function EventTable() {
  // useSuspenseQuery is the suspense enabled alternative to useQuery
  // data is available immediately on render
  const { data } = useSuspenseQuery(HOME_EVENTS);

  const events = data.events;
  if (!events) return <div>No events</div>;

  return (
    <div className="mt-6 flex flex-col gap-4">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
}
