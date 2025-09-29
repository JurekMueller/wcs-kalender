/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organizer` on the `Event` table. All the data in the column will be lost.
  - Added the required column `contactEmail` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "date",
DROP COLUMN "location",
DROP COLUMN "organizer",
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "hyperlink" TEXT,
ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "venueId" INTEGER,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Venue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdhocLocation" (
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "AdhocLocation_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE INDEX "Event_venueId_startTime_idx" ON "public"."Event"("venueId", "startTime");

-- CreateIndex
CREATE INDEX "Event_startTime_idx" ON "public"."Event"("startTime");

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdhocLocation" ADD CONSTRAINT "AdhocLocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
