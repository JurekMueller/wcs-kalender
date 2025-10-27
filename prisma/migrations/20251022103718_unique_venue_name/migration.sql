/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "public"."Venue"("name");
