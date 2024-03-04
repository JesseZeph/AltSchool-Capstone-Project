/*
  Warnings:

  - You are about to drop the column `usedAt` on the `UsedApiKey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsedApiKey" DROP COLUMN "usedAt",
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
