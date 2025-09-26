import { Event } from "@prisma/client";
import { prisma } from "@/app/server/prisma";
import z from "zod";

export const CreateEventZod = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  location: z.string().min(1).max(255),
  organizer: z.string().min(1).max(255),
  date: z.date(),
});
export type CreateEventInput = z.infer<typeof CreateEventZod>;

export async function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany({ orderBy: { date: "asc" } });
}

export async function createEvent(data: CreateEventInput): Promise<Event> {
  return prisma.event.create({
    data,
  });
}
