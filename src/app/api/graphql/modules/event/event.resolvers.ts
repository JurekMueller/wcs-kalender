import { Resolvers } from '@/app/api/graphql/types/graphql';

export const eventResolvers: Resolvers = {
  Query: {
    event: (_p, { id }, { dataService }) => dataService.event.findById(id),
    events: (_p, _a, { dataService }) => dataService.event.findMany(),
  },
  Mutation: {
    createEvent: (_p, { input }, { dataService }) =>
      dataService.event.create(input),
    deleteEvent: (_p, { id }, { dataService }) => dataService.event.delete(id),
  },
  Event: {
    adhocLocation: ({ id, venueId }, _a, { dataService }) => {
      if (venueId) return null;
      return dataService.adhocLocation.findAdhocLocation(id);
    },
    venue: ({ venueId }, _a, { dataService }) => {
      if (venueId) return dataService.venue.findById(venueId);
      else return null;
    },
  },
};
