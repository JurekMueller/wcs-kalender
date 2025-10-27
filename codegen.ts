import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/app/api/graphql/**/*.graphql',
  generates: {
    'src/app/api/graphql/types/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#GraphQLContext',
        scalars: {
          DateTime: 'Date',
        },
        useTypeImports: true,
        mapperTypeSuffix: 'Model', // prevents name conflicts between prisma and SDL types of the same name
        mappers: {
          Venue: '@prisma/client#Venue',
          Event: '@prisma/client#Event',
        },
      },
    },
  },
};

export default config;
