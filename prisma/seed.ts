import {
  CreateEventInput,
  CreateVenueInput,
} from '@/app/api/graphql/types/graphql';
import { auth } from '@/app/server/auth';

import { PrismaDataService } from '@/app/server/data/prisma-data-service';
import { prisma } from '@/app/server/prisma';
import 'dotenv/config';

async function main() {
  /* 
  Add Admin User
  */
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

  // User is tagged as admin
  const user = await prisma.user.update({
    where: { email: adminEmail },
    data: { role: 'admin' },
  });
  const ownerId = user.id;

  console.log('Seeded admin:', user);

  /* Create Data Service */
  const dataService = new PrismaDataService();

  /* Add venues */
  const venues: CreateVenueInput[] = [
    {
      address: 'Neuengasse 24',
      city: 'Bern',
      imageURL:
        'https://pamix.ch/wp-content/uploads/2023/08/cropped-Logo-Pamix-Tanzspielplatz.png.webp',
      name: 'Tanzlounge',
      zipCode: '3011',
      contactEmail: 'info@tanzlounge.ch',
    },
    {
      address: 'Maygutstrasse 20a',
      city: 'Wabern',
      contactEmail: 'info@pamix.ch',
      imageURL:
        'https://pamix.ch/wp-content/uploads/2023/08/cropped-Logo-Pamix-Tanzspielplatz.png.webp',
      name: 'Pamix',
      zipCode: '3084',
    },
  ];

  await Promise.all(venues.map((e) => dataService.venue.create(e, ownerId)));
  const createdVenues = await dataService.venue.findMany();
  console.log('Seeded venues:', createdVenues);

  /* Add events */
  const events: CreateEventInput[] = [
    {
      title: 'WCS Social Night Zurich',
      description: 'Chill Friday social with mixers and Jack & Jill warm-ups.',
      price: 15.0,
      startTime: new Date('2025-11-14T20:00:00+01:00'),
      endTime: new Date('2025-11-15T00:30:00+01:00'),
      venueId: 1,
      contactEmail: 'hello@zwswing.ch',
      hyperlink: 'https://zwswing.ch/events/social-night',
      imageURL: 'https://images.example.com/wcs/social_zurich.jpg',
    },
    {
      title: 'Basel WCS Fundamentals Workshop',
      description:
        'Beginner-friendly technique focus: anchor, connection, and timing.',
      price: 45.0,
      startTime: new Date('2025-12-06T13:00:00+01:00'),
      endTime: new Date('2025-12-06T16:30:00+01:00'),
      venueId: 2,
      contactEmail: 'info@baselswing.ch',
      hyperlink: 'https://baselswing.ch/workshops/fundamentals',
      imageURL: 'https://images.example.com/wcs/basel_workshop.jpg',
    },
    {
      title: 'Lausanne WCS Fusion Party',
      description: 'WCS with a sprinkle of blues and zouk—open-level social.',
      price: 18.0,
      startTime: new Date('2025-11-29T20:30:00+01:00'),
      endTime: new Date('2025-11-30T01:00:00+01:00'),
      adhocLocation: {
        name: 'Studio Ouchy',
        address: "Avenue d'Ouchy 12",
        zipCode: '1006',
        city: 'Lausanne',
      },
      contactEmail: 'contact@lauswing.ch',
      imageURL: 'https://images.example.com/wcs/lausanne_party.jpg',
    },
    {
      title: 'Bern Technique Intensive: Stretch & Elasticity',
      description:
        'Intermediate+ drills for stretch, elasticity, and body flight.',
      price: 60.0,
      startTime: new Date('2026-01-18T11:00:00+01:00'),
      endTime: new Date('2026-01-18T15:00:00+01:00'),
      venueId: 1,
      contactEmail: 'team@bernwestcoast.ch',
      hyperlink: 'https://bernwestcoast.ch/intensive-stretch',
    },
    {
      title: 'Geneva Sunday WCS Tea Dance',
      description: 'Daytime social, tea & snacks included. All levels welcome.',
      price: 12.0,
      startTime: new Date('2025-12-14T15:00:00+01:00'),
      endTime: new Date('2025-12-14T18:00:00+01:00'),
      adhocLocation: {
        name: 'Maison de la Danse Carouge',
        address: 'Rue Jacques-Dalcroze 7',
        zipCode: '1227',
        city: 'Carouge (GE)',
      },
      contactEmail: 'bonjour@genevaswing.ch',
      hyperlink: 'https://genevaswing.ch/tea-dance',
      imageURL: 'https://images.example.com/wcs/geneva_tea_dance.jpg',
    },
    {
      title: 'Winterthur WCS Party',
      price: 10.0,
      startTime: new Date('2026-02-07T20:00:00+01:00'),
      endTime: new Date('2026-02-08T00:00:00+01:00'),
      venueId: 2,
      contactEmail: 'hi@wintswing.ch',
    },
    {
      title: 'Lucerne Musicality & Styling Workshop',
      description: 'Playful footwork, phrasing, and lead/follow conversation.',
      price: 55.0,
      startTime: new Date('2026-03-15T12:00:00+01:00'),
      endTime: new Date('2026-03-15T16:00:00+01:00'),
      adhocLocation: {
        name: 'Tanzraum Reuss',
        address: 'Bruchstrasse 18',
        zipCode: '6003',
        city: 'Luzern',
      },
      contactEmail: 'crew@luzwcs.ch',
      imageURL: 'https://images.example.com/wcs/luzern_workshop.jpg',
    },
    {
      title: 'St. Gallen Late Night Westie Social',
      price: 14.0,
      startTime: new Date('2026-01-31T21:00:00+01:00'),
      endTime: new Date('2026-02-01T01:30:00+01:00'),
      venueId: 1,
      contactEmail: 'hello@stgallswing.ch',
      hyperlink: 'https://stgallswing.ch/events/late-night',
    },
    {
      title: 'Zug WCS Fundamentals Crash Course',
      description:
        'Perfect for newcomers—get dance-floor ready in one afternoon.',
      price: 40.0,
      startTime: new Date('2026-02-22T13:30:00+01:00'),
      endTime: new Date('2026-02-22T16:00:00+01:00'),
      adhocLocation: {
        name: 'Kulturraum Chollerhalle (Studio B)',
        address: 'Chamerstrasse 177',
        zipCode: '6300',
        city: 'Zug',
      },
      contactEmail: 'start@zugswing.ch',
      hyperlink: 'https://zugswing.ch/crash-course',
    },
    {
      title: 'Zurich WCS New Year Kickoff Party',
      description: 'Start the year with socials, mixers, and a demo showcase.',
      price: 20.0,
      startTime: new Date('2026-01-10T20:00:00+01:00'),
      endTime: new Date('2026-01-11T01:00:00+01:00'),
      venueId: 2,
      contactEmail: 'events@zwswing.ch',
      imageURL: 'https://images.example.com/wcs/zurich_kickoff.jpg',
    },
  ];

  await Promise.all(
    events.map((input) => {
      return dataService.event.create(input, ownerId);
    }),
  );
  const createdEvents = await dataService.event.findMany();
  console.log('Seeded events:', createdEvents);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
