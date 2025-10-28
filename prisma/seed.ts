import { auth } from '@/app/server/auth';
import { prisma } from '@/app/server/prisma';
import 'dotenv/config';

async function main() {
  const adminEmail = 'jurek_mueller@yahoo.de';
  const adminPassword = 'Admin_Password'; // change after first login
  const adminName = 'Jurek';

  // If user exists, skip:
  const existing = await prisma.user.findFirst({
    where: { email: adminEmail },
  });
  if (existing) {
    console.log('Admin already exists, skipping seed.');
    return;
  }

  // Use Better Auth's server API so password hashing is identical to production:
  // Endpoint: POST /sign-up/email  -> auth.api.signUpEmail({ body: {...} })
  await auth.api.signUpEmail({
    body: {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
    },
  });

  // Optionally tag the user as "admin". You can use a custom field or a join table.
  // The default schema doesn't include roles, so here's a simple approach:
  // Extend your Prisma User model with e.g. role String @default("user") and then:
  const user = await prisma.user.update({
    where: { email: adminEmail },
    data: { role: 'admin' },
  });

  console.log('Seeded admin:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
