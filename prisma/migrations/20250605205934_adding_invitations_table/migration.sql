/*
  Warnings:

  - You are about to drop the column `userId` on the `UserToRoom` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `UserToRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToRoom" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,
    "addedByEmail" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitations" (
    "id" TEXT NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "inviterEmail" TEXT NOT NULL,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);
