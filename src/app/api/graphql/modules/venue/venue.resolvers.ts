import { Resolvers } from '@/app/api/graphql/types/graphql';

export const venueResolvers: Resolvers = {
  Query: {
    venue: (_p, { id }, { dataService }) => dataService.venue.findById(id),
    venues: (_p, _a, { dataService }) => dataService.venue.findMany(),
  },
  Mutation: {
    createVenue: (_p, { input }, { dataService }) =>
      dataService.venue.create(input),
    deleteVenue: (_p, { id }, { dataService }) => dataService.venue.delete(id),
  },
  Venue: {
    events: ({ id }, _a, { dataService }) =>
      dataService.venue.findVenueEvents(id),
  },
};
