-- CreateTable
CREATE TABLE "UsedApiKey" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "UsedApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsedApiKey_apiKey_key" ON "UsedApiKey"("apiKey");
