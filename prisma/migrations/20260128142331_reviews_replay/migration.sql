/*
  Warnings:

  - You are about to drop the column `authroId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_authroId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "authroId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "storeReplay" TEXT;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
