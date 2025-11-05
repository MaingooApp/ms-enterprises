-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('RESTAURANT', 'SUPPLIER');

-- CreateTable
CREATE TABLE "entity" (
    "id" UUID NOT NULL,
    "type" "EntityType" NOT NULL,
    "parent_id" UUID,
    "name" VARCHAR NOT NULL,
    "cif_nif" VARCHAR,
    "email" VARCHAR,
    "country" VARCHAR,
    "city" VARCHAR,
    "address" VARCHAR,
    "postal_code" VARCHAR,
    "first_phone_prefix" VARCHAR,
    "first_phone_number" VARCHAR,
    "second_phone_prefix" VARCHAR,
    "second_phone_number" VARCHAR,
    "iban" VARCHAR,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "entity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entity" ADD CONSTRAINT "entity_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
