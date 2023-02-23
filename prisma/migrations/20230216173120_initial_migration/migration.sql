-- CreateEnum
CREATE TYPE "APARMENTS_TYPE" AS ENUM ('APARTAMENT', 'COMPOUND');

-- CreateTable
CREATE TABLE "ApartmentImage" (
    "id" SERIAL NOT NULL,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "apartment_id" INTEGER NOT NULL,
    "wide" BOOLEAN NOT NULL,

    CONSTRAINT "ApartmentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "AmenitiesGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenitiy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "Amenitiy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmentiesOnAparments" (
    "amenity_id" INTEGER NOT NULL,
    "apartment_id" INTEGER NOT NULL,
    "description" TEXT,
    "highlighted" BOOLEAN DEFAULT false,
    "priority" INTEGER,

    CONSTRAINT "AmentiesOnAparments_pkey" PRIMARY KEY ("amenity_id","apartment_id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "beds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "main_feature" VARCHAR(255) NOT NULL,
    "max_people" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "rooms" INTEGER NOT NULL,
    "type" "APARMENTS_TYPE" NOT NULL,
    "compound_id" INTEGER,
    "google_calendar_id" VARCHAR(255),

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmenitiesGroup_name_key" ON "AmenitiesGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Amenitiy_name_key" ON "Amenitiy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_name_key" ON "Apartment"("name");

-- AddForeignKey
ALTER TABLE "ApartmentImage" ADD CONSTRAINT "ApartmentImage_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenitiy" ADD CONSTRAINT "Amenitiy_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "AmenitiesGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmentiesOnAparments" ADD CONSTRAINT "AmentiesOnAparments_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "Amenitiy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmentiesOnAparments" ADD CONSTRAINT "AmentiesOnAparments_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_compound_id_fkey" FOREIGN KEY ("compound_id") REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;