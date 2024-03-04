/*
  Warnings:

  - You are about to drop the column `governorName` on the `State` table. All the data in the column will be lost.
  - Added the required column `president` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `governor` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "president" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "State" DROP COLUMN "governorName",
ADD COLUMN     "governor" TEXT NOT NULL,
ADD COLUMN     "rulingParty" TEXT,
ADD COLUMN     "senatorialDistrict" TEXT[];
