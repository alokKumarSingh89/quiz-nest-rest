import { MigrationInterface, QueryRunner } from 'typeorm';

export class Options1663386201184 implements MigrationInterface {
  name = 'Options1663386201184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL, "questionId" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "quizes" ALTER COLUMN "isActive" SET DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "options" ADD CONSTRAINT "FK_46b668c49a6c4154d4643d875a5" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "options" DROP CONSTRAINT "FK_46b668c49a6c4154d4643d875a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quizes" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
    await queryRunner.query(`DROP TABLE "options"`);
  }
}
