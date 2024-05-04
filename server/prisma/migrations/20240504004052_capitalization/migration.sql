/*
  Warnings:

  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_ticket_id_fkey";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "tickets";

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Tessages" (
    "message_id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "message_text" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tessages_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "Tessages" ADD CONSTRAINT "Tessages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Tickets"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
