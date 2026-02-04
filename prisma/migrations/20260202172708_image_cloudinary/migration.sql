/*
  Warnings:

  - You are about to drop the column `image` on the `medicines` table. All the data in the column will be lost.
  - Added the required column `imageCloudinaryId` to the `medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "image",
ADD COLUMN     "imageCloudinaryId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
