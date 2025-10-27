import { CreateEventInput } from '@/app/api/graphql/types/graphql';
import { prisma } from '@/app/server/prisma';
import { Prisma } from '@prisma/client';

export class PrismaDataService {
  venue = {
    findById: (id: number) => {
      return prisma.venue.findUnique({ where: { id: id } });
    },
    findMany: () => {
      return prisma.venue.findMany();
    },
    create: (input: Prisma.VenueCreateInput) => {
      return prisma.venue.create({ data: input });
    },
    delete: (id: number) => {
      return prisma.venue.delete({ where: { id: id } });
    },
    findVenueEvents: async (venueId: number) => {
      // The use of the prisma fluent API helps to avoid the N+1 problem
      // At the moment prisma only batches findUnique calls.
      return (
        (await prisma.venue.findUnique({ where: { id: venueId } }).events()) ||
        []
      );
    },
  };

  event = {
    findById: (id: string) => {
      return prisma.event.findUnique({
        where: { id: id },
      });
    },
    findMany: (where?: { [key: string]: unknown }) => {
      return prisma.event.findMany({
        where: where,
      });
    },
    create: (input: CreateEventInput) => {
      const { adhocLocation, venueId, ...eventInput } = input;
      if (venueId)
        return prisma.event.create({
          data: { ...eventInput, venue: { connect: { id: venueId } } },
        });
      else if (adhocLocation)
        return prisma.event.create({
          data: {
            ...eventInput,
            adhocLocation: { create: { ...adhocLocation } },
          },
        });
      else throw new Error('Event needs a location or venue');
    },
    delete: (id: string) => {
      // potential adhocLocations should be deleted automatically due to onDelete: cascade
      return prisma.event.delete({ where: { id: id } });
    },
  };

  adhocLocation = {
    findAdhocLocation: (eventId: string) => {
      return prisma.adhocLocation.findUnique({
        where: { eventId: eventId },
      });
    },
  };
}
