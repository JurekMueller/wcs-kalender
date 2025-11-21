-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('PARTY', 'WORKSHOP');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tags" "Tag"[];
