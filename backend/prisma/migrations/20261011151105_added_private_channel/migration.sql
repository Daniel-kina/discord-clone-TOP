-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "privateChannelId" TEXT;

-- CreateTable
CREATE TABLE "DirectMessageChannel" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,

    CONSTRAINT "DirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DirectMessageChannel_user1Id_user2Id_key" ON "DirectMessageChannel"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_privateChannelId_fkey" FOREIGN KEY ("privateChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChannel" ADD CONSTRAINT "DirectMessageChannel_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChannel" ADD CONSTRAINT "DirectMessageChannel_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
