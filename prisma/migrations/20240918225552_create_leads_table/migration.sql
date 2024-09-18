-- CreateEnum
CREATE TYPE "source" AS ENUM ('WEBSITE', 'SOCIAL_MEDIA', 'EVENT', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('NEW', 'IN_CONTACT', 'QUALIFIED', 'PROPOSAL_SENT', 'CLOSED', 'LOST');

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "source" "source",
    "status" "status" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");
