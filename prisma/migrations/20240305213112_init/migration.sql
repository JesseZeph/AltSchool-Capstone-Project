-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "apiKey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsedApiKey" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "UsedApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "president" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "population" INTEGER,
    "description" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "population" INTEGER,
    "description" TEXT,
    "gdp" DOUBLE PRECISION,
    "regionName" TEXT,
    "governor" TEXT NOT NULL,
    "rulingParty" TEXT,
    "capitalCity" TEXT NOT NULL,
    "areaSize" TEXT,
    "senatorialDistrict" TEXT[],

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalGovernmentArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "stateName" TEXT,
    "regionName" TEXT,
    "regionId" INTEGER NOT NULL,
    "description" TEXT,
    "population" INTEGER,
    "established" TIMESTAMP(3),

    CONSTRAINT "LocalGovernmentArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsedApiKey_apiKey_key" ON "UsedApiKey"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGovernmentArea_name_key" ON "LocalGovernmentArea"("name");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalGovernmentArea" ADD CONSTRAINT "LocalGovernmentArea_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalGovernmentArea" ADD CONSTRAINT "LocalGovernmentArea_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
