/*
  Warnings:

  - Made the column `category` on table `venues` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `venues` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `venues` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "venues" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;
