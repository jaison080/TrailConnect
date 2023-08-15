/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `Transport` table. All the data in the column will be lost.
  - Added the required column `from_wid` to the `Transport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_wid` to the `Transport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transport" DROP CONSTRAINT "Transport_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "Transport" DROP COLUMN "warehouse_id",
ADD COLUMN     "from_wid" TEXT NOT NULL,
ADD COLUMN     "to_wid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_from_wid_fkey" FOREIGN KEY ("from_wid") REFERENCES "Warehouse"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_to_wid_fkey" FOREIGN KEY ("to_wid") REFERENCES "Warehouse"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
