import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/app/server/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  additionalFields: {
    role: {
      type: 'string',
      required: true,
      defaultValue: 'user',
      input: false, // don't allow user to set role
    },
  },
});
