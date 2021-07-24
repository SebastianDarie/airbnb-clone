import {MigrationInterface, QueryRunner} from "typeorm";

export class DBSetup1627154027315 implements MigrationInterface {
    name = 'DBSetup1627154027315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_6770810606a71b529e2fffeb73c"`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "cleanliness" integer NOT NULL, "accuracy" integer NOT NULL, "checkIn" integer NOT NULL, "communication" integer NOT NULL, "location" integer NOT NULL, "value" integer NOT NULL, "review" character varying NOT NULL, "listingId" uuid NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "arrival" date NOT NULL, "departure" date NOT NULL, "guests" integer NOT NULL, "cancelled" bit NOT NULL DEFAULT '0', "completed" bit NOT NULL DEFAULT '0', "paymentIntent" character varying NOT NULL, "listingId" uuid NOT NULL, "guestId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "header" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "toId" uuid NOT NULL, "subject" character varying NOT NULL, "reservationId" uuid, "creatorId" uuid NOT NULL, "listingId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_0d94557aea7b7acd68db138f3a" UNIQUE ("reservationId"), CONSTRAINT "PK_007a885cf40484eb750d0355339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "listingId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "isFromSender" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD "read" bit NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "message" ADD "headerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT 'Test User'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoUrl" character varying NOT NULL DEFAULT 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "superhost" bit NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "listing" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listing" ADD "location" geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "text" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "listing" ADD "price" double precision NOT NULL DEFAULT '25'`);
        await queryRunner.query(`CREATE INDEX "IDX_bf56d3dac172f6aaff96e8dec8" ON "listing" USING GiST ("location") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_79dabbaa953edb736f056503352" FOREIGN KEY ("headerId") REFERENCES "header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_78206aaebe474a955ef481f557f" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_9a25a94c510e29633c263673888" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_61c35cd3732c1d3767df83709f6" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_005fbe8bc326fced13b5751aeb3" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_0d94557aea7b7acd68db138f3ac" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_c9d72a2d9625f397dd89deaaa4c" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_43cd05ff4e27601c02fa04b0650" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_43cd05ff4e27601c02fa04b0650"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_c9d72a2d9625f397dd89deaaa4c"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_0d94557aea7b7acd68db138f3ac"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_005fbe8bc326fced13b5751aeb3"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_61c35cd3732c1d3767df83709f6"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_9a25a94c510e29633c263673888"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_78206aaebe474a955ef481f557f"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_79dabbaa953edb736f056503352"`);
        await queryRunner.query(`DROP INDEX "IDX_bf56d3dac172f6aaff96e8dec8"`);
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "listing" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "superhost"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoUrl"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "headerId"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "read"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "isFromSender"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "listingId" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_6770810606a71b529e2fffeb73c" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
