import { Resolvers } from '@/app/api/graphql/types/graphql';
import { GraphQLError } from 'graphql';

export const venueResolvers: Resolvers = {
  Query: {
    venue: (_p, { id }, { dataService }) => dataService.venue.findById(id),
    venues: (_p, _a, { dataService }) => dataService.venue.findMany(),
  },
  Mutation: {
    createVenue: (_p, { input }, { dataService, user }) => {
      if (!user)
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      return dataService.venue.create(input, user.id);
    },
    deleteVenue: (_p, { id }, { dataService }) => dataService.venue.delete(id),
  },
  Venue: {
    events: ({ id }, _a, { dataService }) =>
      dataService.venue.findVenueEvents(id),
  },
};
