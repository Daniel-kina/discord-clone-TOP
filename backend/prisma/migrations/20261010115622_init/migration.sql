-- DropForeignKey
ALTER TABLE "TextChannel" DROP CONSTRAINT "TextChannel_categoryId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "file" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TextChannel" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TextChannel" ADD CONSTRAINT "TextChannel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
