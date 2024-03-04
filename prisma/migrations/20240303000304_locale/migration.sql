-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
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
    "governorName" TEXT NOT NULL,
    "capitalCity" TEXT NOT NULL,
    "areaSize" TEXT,

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
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_regionId_key" ON "State"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGovernmentArea_name_key" ON "LocalGovernmentArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGovernmentArea_stateId_key" ON "LocalGovernmentArea"("stateId");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalGovernmentArea" ADD CONSTRAINT "LocalGovernmentArea_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalGovernmentArea" ADD CONSTRAINT "LocalGovernmentArea_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
