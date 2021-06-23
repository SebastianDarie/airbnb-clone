import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1624476684072 implements MigrationInterface {
  name = 'Initial1624476684072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //     await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "forgotPasswordLocked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    //     await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "creatorId" uuid NOT NULL, "listingId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    //     await queryRunner.query(`CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(500) NOT NULL, "category" character varying NOT NULL, "type" character varying NOT NULL, "photos" text array NOT NULL, "price" character varying NOT NULL, "bathrooms" integer NOT NULL, "bedrooms" integer NOT NULL, "beds" integer NOT NULL, "guests" integer NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "amenities" text array NOT NULL, "highlights" text array NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
    //     await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_e04040c4ea7133eeddefff6417d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    //     await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_6770810606a71b529e2fffeb73c" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    //     await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_b99fbe15ee3e87f40a31e2d871f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_b99fbe15ee3e87f40a31e2d871f"`);
    // await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_6770810606a71b529e2fffeb73c"`);
    // await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_e04040c4ea7133eeddefff6417d"`);
    // await queryRunner.query(`DROP TABLE "listing"`);
    // await queryRunner.query(`DROP TABLE "message"`);
    // await queryRunner.query(`DROP TABLE "user"`);
  }
}
