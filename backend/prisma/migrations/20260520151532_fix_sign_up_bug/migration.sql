/*
  Warnings:

  - Made the column `user_status` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_status" SET NOT NULL;
