import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/app/api/graphql/**/*.graphql',
  documents: 'src/app/**/*.tsx',
  generates: {
    'src/app/api/graphql/types/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeScriptAny: false,
        defaultScalarType: 'unknown',
        enumsAsTypes: true,
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
        avoidOptionals: {
          defaultValue: true,
        },
      },
    },
    'src/app/api/graphql/types/client/': {
      preset: 'client',
      config: {
        scalars: { DateTime: 'string' },
      },
    },
  },
};

export default config;
