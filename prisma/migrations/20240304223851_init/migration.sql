/*
  Warnings:

  - You are about to drop the column `used` on the `UsedApiKey` table. All the data in the column will be lost.
  - Made the column `apiKey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UsedApiKey" DROP COLUMN "used";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "apiKey" SET NOT NULL;
