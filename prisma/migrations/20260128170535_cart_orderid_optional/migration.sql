/*
  Warnings:

  - Made the column `medicineId` on table `carts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "medicineId" SET NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;
