/*
  Warnings:

  - Added the required column `Password_Hash` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "Password_Hash" VARCHAR(255) NOT NULL;
