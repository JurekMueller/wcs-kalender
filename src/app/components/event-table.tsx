'use client';

import { graphql } from '@/app/api/graphql/types/client';
import {
  EventSortField,
  SortDirection,
} from '@/app/api/graphql/types/client/graphql';
import { EventCard } from '@/app/components/event-card';
import { useSuspenseQuery } from '@apollo/client/react';

const HOME_EVENTS = graphql(`
  query Events($filter: EventFilterInput, $sort: EventSortInput) {
    events(filter: $filter, sort: $sort) {
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

export function EventTable() {
  // useSuspenseQuery is the suspense enabled alternative to useQuery
  // data is available immediately on render
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { data } = useSuspenseQuery(HOME_EVENTS, {
    variables: {
      sort: {
        field: EventSortField.StartTime,
        direction: SortDirection.Asc,
      },
      filter: {
        startTimeGte: today.toISOString(),
      },
    },
    // Even though this is a client component, without 'no-store', nextjs fetches data during build time.
    // This is due to how useSuspenseQuery interacts with SSR
    context: { fetchOptions: { cache: 'no-store' } },
  });

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
