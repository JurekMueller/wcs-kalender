/*
  Warnings:

  - Added the required column `contactEmail` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Venue" ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT;
