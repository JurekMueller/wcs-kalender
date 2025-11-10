import { Resolvers } from '@/app/api/graphql/types/graphql';

export const locationResolvers: Resolvers = {
  Location: {
    // This is needed to resolve the object type of a graphql interface
    __resolveType: (location) => {
      if ('contactEmail' in location) return 'Venue';
      else return 'AdhocLocation';
    },
  },
};
