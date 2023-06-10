import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1686403174670 implements MigrationInterface {
  name = 'Initial1686403174670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" bigint NOT NULL, "updated_at" bigint, "username" character varying NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" bigint NOT NULL, "updated_at" bigint, "name" character varying NOT NULL, CONSTRAINT "UQ_a75bfadcd8291a0538ab7abfdcf" UNIQUE ("name"), CONSTRAINT "PK_9da897b4b067fca0ceb55f33244" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" bigint NOT NULL, "updated_at" bigint, "name" character varying NOT NULL, "price" double precision NOT NULL, "status" "public"."products_status_enum" NOT NULL DEFAULT 'active', "product_category_uuid" uuid NOT NULL, CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_1c590180b0489a21a97f4e6dbfe" FOREIGN KEY ("product_category_uuid") REFERENCES "product_categories"("uuid") ON DELETE NO ACTION ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_1c590180b0489a21a97f4e6dbfe"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
    await queryRunner.query(`DROP TABLE "product_categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
