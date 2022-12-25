import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1671982952412 implements MigrationInterface {
    name = 'FirstMigration1671982952412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sessions\` (\`expiredAt\` bigint NOT NULL, \`id\` varchar(255) NOT NULL, \`json\` text NOT NULL, \`destroyedAt\` datetime(6) NULL, INDEX \`IDX_4c1989542e47d9e3b98fe32c67\` (\`expiredAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c1989542e47d9e3b98fe32c67\` ON \`sessions\``);
        await queryRunner.query(`DROP TABLE \`sessions\``);
    }

}
