/*
  Warnings:

  - You are about to drop the column `storeReplay` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "storeReplay",
ADD COLUMN     "storeReply" TEXT;
