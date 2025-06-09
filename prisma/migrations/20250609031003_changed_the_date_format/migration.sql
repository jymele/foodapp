/*
  Warnings:

  - You are about to drop the `Invitations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "Invitations";

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "invitee_email" TEXT NOT NULL,
    "inviter_email" TEXT NOT NULL,
    "household_id" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);
