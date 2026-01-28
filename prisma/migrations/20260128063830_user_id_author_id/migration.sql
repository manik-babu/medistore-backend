/*
  Warnings:

  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authroId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- DropIndex
DROP INDEX "carts_userId_idx";

-- DropIndex
DROP INDEX "medicines_userId_idx";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "userId",
ADD COLUMN     "authroId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "carts_authorId_idx" ON "carts"("authorId");

-- CreateIndex
CREATE INDEX "medicines_authorId_idx" ON "medicines"("authorId");

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authroId_fkey" FOREIGN KEY ("authroId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
