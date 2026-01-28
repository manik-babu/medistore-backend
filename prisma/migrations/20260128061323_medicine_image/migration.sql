/*
  Warnings:

  - Added the required column `image` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicines" ADD COLUMN     "image" TEXT NOT NULL;
