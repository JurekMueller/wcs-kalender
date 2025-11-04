// import { Event } from "@prisma/client";
// import { prisma } from "@/app/server/prisma";
// import z from "zod";

// export const VenueZod = z.object({
//   id: z.number(),
//   name: z.string(),
//   address: z.string(),
//   zipCode: z.string(),
//   city: z.string(),
//   contactEmail: z.email(),
//   imageURL: z.url().optional(),
// });
// export type Venue = z.infer<typeof VenueZod>;

// export const AdhocLocationZod = z.object({
//   eventId: z.string(),
//   name: z.string(),
//   address: z.string(),
//   zipCode: z.string(),
//   city: z.string(),
// });
// export type AdhocLocation = z.infer<typeof AdhocLocationZod>;

// export const CreateEventZod = z
//   .object({
//     title: z.string().min(1).max(255),
//     description: z.string().min(1).max(5000),
//     price: z.number().min(0).optional(),
//     startTime: z.date(),
//     endTime: z.date(),
//     adhocLocation: AdhocLocationZod.optional(),
//     venueId: z.number().optional(),
//     contactEmail: z.email(),
//     imageURL: z.url().optional(),
//   })
//   // validate start < end and convert to ISO
//   .superRefine((val, ctx) => {
//     if (val.endTime <= val.startTime) {
//       ctx.addIssue({
//         code: "custom",
//         message: "endTime must be after startTime",
//         path: ["endTime"],
//       });
//     }
//   })
//   .transform(({ startTime, endTime, ...rest }) => ({
//     ...rest,
//     startTime: startTime.toISOString(),
//     endTime: endTime.toISOString(),
//   }));
// export type CreateEventInput = z.infer<typeof CreateEventZod>;

// export async function getAllEvents(): Promise<Event[]> {
//   return prisma.event.findMany({ orderBy: { startTime: "asc" } });
// }

// export async function createEvent(data: CreateEventInput): Promise<Event> {
//   const { venueId, adhocLocation, ...eventData } = data;
//   return prisma.event.create({
//     data: {
//       ...eventData,
//       ...(venueId ? { venue: { connect: { id: venueId } } } : {}),
//       ...(adhocLocation ? { adhocLocation: { create: adhocLocation } } : {}),
//     },
//   });
// }
