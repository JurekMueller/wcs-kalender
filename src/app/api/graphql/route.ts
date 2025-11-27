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

// Ensure this route runs in the Node.js runtime so server-side auth and
// Prisma (which rely on Node APIs) work correctly in deployments.
export const runtime = 'nodejs';

// I needed to prevent type inference here and addign BaseContext, because
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

const allowedOrigin =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

function withCors(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  return response;
}

export async function GET(request: NextRequest) {
  const res = await handler(request);
  return withCors(res);
}

export async function POST(request: NextRequest) {
  const res = await handler(request);
  return withCors(res);
}

// Required so browsers can preflight POST requests
export async function OPTIONS() {
  return withCors(new Response(null, { status: 204 }));
}
