import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendRequestMigration1672592566750 implements MigrationInterface {
    name = 'FriendRequestMigration1672592566750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_presence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`statusMessage\` varchar(255) NULL, \`showOffline\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friends\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`senderId\` int NULL, \`receiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend_requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` varchar(255) NOT NULL, \`senderId\` int NULL, \`receiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`presenceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_26b95d296be75fc99a8c01bef0\` (\`presenceId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_26b95d296be75fc99a8c01bef0\` ON \`users\` (\`presenceId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_26b95d296be75fc99a8c01bef0a\` FOREIGN KEY (\`presenceId\`) REFERENCES \`user_presence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_26b95d296be75fc99a8c01bef0a\``);
        await queryRunner.query(`DROP INDEX \`REL_26b95d296be75fc99a8c01bef0\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_26b95d296be75fc99a8c01bef0\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`presenceId\``);
        await queryRunner.query(`DROP TABLE \`friend_requests\``);
        await queryRunner.query(`DROP TABLE \`friends\``);
        await queryRunner.query(`DROP TABLE \`user_presence\``);
    }

}
