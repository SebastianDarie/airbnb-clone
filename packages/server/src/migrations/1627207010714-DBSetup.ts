import {MigrationInterface, QueryRunner} from "typeorm";

export class DBSetup1627207010714 implements MigrationInterface {
    name = 'DBSetup1627207010714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isFromSender" bit NOT NULL, "text" text NOT NULL, "read" bit NOT NULL DEFAULT '0', "headerId" uuid NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "cleanliness" integer NOT NULL, "accuracy" integer NOT NULL, "checkIn" integer NOT NULL, "communication" integer NOT NULL, "location" integer NOT NULL, "value" integer NOT NULL, "review" character varying NOT NULL, "listingId" uuid NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "name" character varying NOT NULL DEFAULT 'Test User', "password" character varying NOT NULL, "photoUrl" character varying NOT NULL DEFAULT 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3', "confirmed" boolean NOT NULL DEFAULT false, "forgotPasswordLocked" boolean NOT NULL DEFAULT false, "superhost" bit NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "arrival" date NOT NULL, "departure" date NOT NULL, "guests" integer NOT NULL, "cancelled" bit NOT NULL DEFAULT '0', "completed" bit NOT NULL DEFAULT '0', "paymentIntent" character varying NOT NULL, "listingId" uuid NOT NULL, "guestId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(500) NOT NULL, "category" character varying NOT NULL, "type" character varying NOT NULL, "photos" text array NOT NULL, "price" double precision NOT NULL DEFAULT '25', "bathrooms" integer NOT NULL, "bedrooms" integer NOT NULL, "beds" integer NOT NULL, "guests" integer NOT NULL, "city" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "location" geography(Point,4326), "amenities" text array NOT NULL, "highlights" text array NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf56d3dac172f6aaff96e8dec8" ON "listing" USING GiST ("location") `);
        await queryRunner.query(`CREATE TABLE "header" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "toId" uuid NOT NULL, "subject" character varying NOT NULL, "reservationId" uuid, "creatorId" uuid NOT NULL, "listingId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_0d94557aea7b7acd68db138f3a" UNIQUE ("reservationId"), CONSTRAINT "PK_007a885cf40484eb750d0355339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_79dabbaa953edb736f056503352" FOREIGN KEY ("headerId") REFERENCES "header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_e04040c4ea7133eeddefff6417d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_78206aaebe474a955ef481f557f" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_9a25a94c510e29633c263673888" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_61c35cd3732c1d3767df83709f6" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_005fbe8bc326fced13b5751aeb3" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_b99fbe15ee3e87f40a31e2d871f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_0d94557aea7b7acd68db138f3ac" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_c9d72a2d9625f397dd89deaaa4c" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_43cd05ff4e27601c02fa04b0650" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_43cd05ff4e27601c02fa04b0650"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_c9d72a2d9625f397dd89deaaa4c"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_0d94557aea7b7acd68db138f3ac"`);
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_b99fbe15ee3e87f40a31e2d871f"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_005fbe8bc326fced13b5751aeb3"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_61c35cd3732c1d3767df83709f6"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_9a25a94c510e29633c263673888"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_78206aaebe474a955ef481f557f"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_e04040c4ea7133eeddefff6417d"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_79dabbaa953edb736f056503352"`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`DROP INDEX "IDX_bf56d3dac172f6aaff96e8dec8"`);
        await queryRunner.query(`DROP TABLE "listing"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
