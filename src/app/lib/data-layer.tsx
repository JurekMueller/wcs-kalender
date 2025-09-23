import { Event, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateEventData = Omit<Event, "id" | "createdAt" | "updatedAt">;

export function createEvent(data: CreateEventData) {
  return prisma.event.create({
    data,
  });
}
