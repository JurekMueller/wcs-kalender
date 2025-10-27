/*
  Warnings:

  - The `endTime` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startTime` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3),
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Event_venueId_startTime_idx" ON "public"."Event"("venueId", "startTime");

-- CreateIndex
CREATE INDEX "Event_startTime_idx" ON "public"."Event"("startTime");
