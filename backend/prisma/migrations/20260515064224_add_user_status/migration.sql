-- CreateEnum
CREATE TYPE "Userstatus" AS ENUM ('vistor', 'owner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_status" "Userstatus";
