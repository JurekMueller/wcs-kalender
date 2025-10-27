import { scalarResolvers } from '@/app/api/graphql/common/scalars.resolvers';
import { eventResolvers } from '@/app/api/graphql/modules/event/event.resolvers';
import { venueResolvers } from '@/app/api/graphql/modules/venue/venue.resolvers';
import { Resolvers } from '@/app/api/graphql/types/graphql';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// We need to force a nodejs runtime here, because we want to use node path
export const runtime = 'nodejs';
// This is needed because the node __dirname is not available in ES Modules
// In new versions of node import.meta.dirname is a convenient alternative
// However this does not seem to work yet with bundlers like webpack and turbopack
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const schemaFiles = loadFilesSync([
  path.join(__dirname, 'common/*.graphql'),
  path.join(__dirname, 'modules/**/*.graphql'),
]);
export const typeDefs = mergeTypeDefs(schemaFiles);

// loadFilesSync can not be used for the resolvers as the import paths in the resolver files can not be resolved properly during bundling.
const resolverFiles = [scalarResolvers, venueResolvers, eventResolvers];
export const resolvers: Resolvers = mergeResolvers(resolverFiles);
