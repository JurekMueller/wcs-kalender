import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Webpack config (used when NOT running with --turbopack).
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gql|graphql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    });

    return config;
  },

  // Turbopack config (used when you run `next dev --turbo` or `next build --turbopack`)
  turbopack: {
    rules: {
      // Apply the loader to all .graphql files
      '*.graphql': {
        loaders: ['graphql-tag/loader'],
        // Tell Turbopack that the transformed module should be treated as JS
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
