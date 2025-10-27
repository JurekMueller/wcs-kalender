import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { NextRequest } from 'next/server';
import { PrismaDataService } from '@/app/server/data/prisma-data-service';
import { typeDefs, resolvers } from '@/app/api/graphql';
import { GraphQLContext } from '@/app/api/graphql/context';

// I needed to prevent type inference here and addign BaseContext, because
// startServerAndCreateNextHandler could not deal with anything else
const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<GraphQLContext> => ({
    req,
    dataService: new PrismaDataService(),
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
