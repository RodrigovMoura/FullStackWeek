/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `TripReservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TripReservation" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPaid" DECIMAL(8,2) NOT NULL DEFAULT 0;
