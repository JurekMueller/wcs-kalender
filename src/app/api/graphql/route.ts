import { GraphQLScalarType, Kind } from "graphql";
import {
  createEvent,
  CreateEventZod,
  getAllEvents,
} from "@/app/server/data/event";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { NextRequest } from "next/server";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "ISO-formatted date string → JS Date",
  serialize(value: unknown) {
    // outgoing: Date → string
    if (!(value instanceof Date)) {
      throw new TypeError(
        "GraphQL Date Scalar can only serialize Date objects"
      );
    }
    return value.toISOString();
  },
  parseValue(value: unknown) {
    // incoming from variables: string → Date
    if (typeof value !== "string") {
      throw new TypeError("Date must be a string");
    }
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      throw new TypeError("Invalid Date");
    }
    return d;
  },
  parseLiteral(ast) {
    // incoming from hard-coded query: AST → Date
    if (ast.kind === Kind.STRING) {
      const d = new Date(ast.value);
      if (isNaN(d.getTime())) {
        throw new TypeError("Invalid Date");
      }
      return d;
    }
    throw new TypeError("Date must be a string");
  },
});

const typeDefs = `#graphql
  
  scalar DateTime

  type Event {
    id: ID!
    title: String!
    description: String
    location: String!
    organizer: String!
    date: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
  }

  input CreateEventInput {
    title: String!
    description: String
    location: String!
    organizer: String!
    date: DateTime!
  }
`;

const resolvers = {
  DateTime: DateScalar,
  Query: {
    events: async () => {
      return getAllEvents();
    },
  },
  Mutation: {
    createEvent: async (_parent: unknown, { input }: { input: unknown }) => {
      const event = CreateEventZod.parse(input);
      return createEvent(event);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
