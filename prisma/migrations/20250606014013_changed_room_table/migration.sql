/*
  Warnings:

  - You are about to drop the column `inviteeEmail` on the `Invitations` table. All the data in the column will be lost.
  - You are about to drop the column `inviterEmail` on the `Invitations` table. All the data in the column will be lost.
  - You are about to drop the column `addedByEmail` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToRoom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `household_id` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invitee_email` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inviter_email` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_email` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `household_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserToRoom" DROP CONSTRAINT "UserToRoom_roomId_fkey";

-- AlterTable
ALTER TABLE "Invitations" DROP COLUMN "inviteeEmail",
DROP COLUMN "inviterEmail",
ADD COLUMN     "household_id" TEXT NOT NULL,
ADD COLUMN     "invitee_email" TEXT NOT NULL,
ADD COLUMN     "inviter_email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "addedByEmail",
DROP COLUMN "roomId",
ADD COLUMN     "created_by_email" TEXT NOT NULL,
ADD COLUMN     "household_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "UserToRoom";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Household" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHousehold" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "household_id" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "UserHousehold_pkey" PRIMARY KEY ("id")
);
