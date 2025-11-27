import { scalarResolvers } from '@/app/api/graphql/common/scalars.resolvers';
import { eventResolvers } from '@/app/api/graphql/modules/event/event.resolvers';
import { locationResolvers } from '@/app/api/graphql/modules/location/location.resolvers';
import { venueResolvers } from '@/app/api/graphql/modules/venue/venue.resolvers';
import { Resolvers } from '@/app/api/graphql/types/graphql';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

// SDL imports – these work because of the @graphql-tools/webpack-loader
import rootSDL from '@/app/api/graphql/common/root.schema.graphql';
import scalarsSDL from '@/app/api/graphql/common/scalars.graphql';
import eventSDL from '@/app/api/graphql/modules/event/event.schema.graphql';
import locationSDL from '@/app/api/graphql/modules/location/location.interface.graphql';
import adhocLocationSDL from '@/app/api/graphql/modules/adhoc-location/adhoc-location.schema.graphql';
import venueSDL from '@/app/api/graphql/modules/venue/venue.schema.graphql';

// Merge all SDL pieces
const typeDefs = mergeTypeDefs([
  rootSDL,
  scalarsSDL,
  eventSDL,
  locationSDL,
  adhocLocationSDL,
  venueSDL,
]);

// Merge resolvers
const resolvers: Resolvers = mergeResolvers([
  scalarResolvers,
  venueResolvers,
  eventResolvers,
  locationResolvers,
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
