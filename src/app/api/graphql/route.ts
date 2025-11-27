import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { NextRequest } from 'next/server';
import { PrismaDataService } from '@/app/server/data/prisma-data-service';
import { schema } from '@/app/api/graphql';
import { GraphQLContext } from '@/app/api/graphql/context';
import { auth } from '@/app/server/auth';

// I needed to prevent type inference here and adding BaseContext, because
// startServerAndCreateNextHandler could not deal with anything else
const server = new ApolloServer<BaseContext>({
  schema,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<GraphQLContext> => {
    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;
    return {
      req,
      dataService: new PrismaDataService(),
      user,
    };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
