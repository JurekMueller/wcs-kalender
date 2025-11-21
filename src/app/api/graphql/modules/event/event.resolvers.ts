import { Resolvers } from '@/app/api/graphql/types/graphql';
import { GraphQLError } from 'graphql';

export const eventResolvers: Resolvers = {
  Query: {
    event: (_p, { id }, { dataService }) => dataService.event.findById(id),
    events: (_p, { filter, sort }, { dataService }) =>
      dataService.event.findMany({ filter, sort }),
  },
  Mutation: {
    createEvent: (_p, { input }, { dataService, user }) => {
      if (!user)
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      return dataService.event.create(input, user.id);
    },
    deleteEvent: (_p, { id }, { dataService }) => dataService.event.delete(id),
  },
  Event: {
    location: async ({ id, venueId }, _a, { dataService }) => {
      if (venueId) {
        const venue = await dataService.venue.findById(venueId);
        if (!venue) throw new GraphQLError('Venue was not found');
        return venue;
      }
      const adhocLocation =
        await dataService.adhocLocation.findAdhocLocation(id);
      if (!adhocLocation) throw new GraphQLError('AdhocLocation was not found');
      return adhocLocation;
    },
  },
};
