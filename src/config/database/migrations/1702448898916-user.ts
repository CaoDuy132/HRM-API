import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1702448898916 implements MigrationInterface {
  name = 'User1702448898916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phoneNumber\` tinyint NOT NULL DEFAULT 1, \`abc\` tinyint NOT NULL DEFAULT 1, \`bef\` tinyint NOT NULL DEFAULT 1, \`gef\` tinyint NOT NULL DEFAULT 1, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
