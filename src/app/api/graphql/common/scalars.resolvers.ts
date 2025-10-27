import { Resolvers } from '@/app/api/graphql/types/graphql';
import { DateTimeResolver } from 'graphql-scalars';

export const scalarResolvers: Resolvers = {
  DateTime: DateTimeResolver,
};
