/*
  Warnings:

  - You are about to drop the column `date_created` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "date_created",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "updated_at" DROP NOT NULL;
