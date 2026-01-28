-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_medicineId_fkey";

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
