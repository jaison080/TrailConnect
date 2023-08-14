/*
  Warnings:

  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Driver_ID_seq";
