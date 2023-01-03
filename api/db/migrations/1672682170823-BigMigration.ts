import { MigrationInterface, QueryRunner } from "typeorm";

export class BigMigration1672682170823 implements MigrationInterface {
    name = 'BigMigration1672682170823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_message_attachments\` (\`key\` varchar(36) NOT NULL, \`messageId\` int NULL, PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`authorId\` int NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`avatar\` varchar(255) NULL, \`creatorId\` int NULL, \`ownerId\` int NULL, \`last_message_sent\` int NULL, UNIQUE INDEX \`REL_4147c690073a1c217af1169841\` (\`last_message_sent\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creatorId\` int NULL, \`recipientId\` int NULL, \`last_message_sent\` int NULL, UNIQUE INDEX \`IDX_761a5583cb503b1124b174e13f\` (\`creatorId\`, \`recipientId\`), UNIQUE INDEX \`REL_3a608098e0ab9bf5f8f54c4a09\` (\`last_message_sent\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message_attachments\` (\`key\` varchar(36) NOT NULL, \`messageId\` int NULL, PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`authorId\` int NULL, \`conversationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`about\` varchar(255) NOT NULL DEFAULT '', \`avatar\` varchar(255) NULL, \`banner\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups_users_users\` (\`groupsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_6320d5cbd6f7702b2e78d38d6b\` (\`groupsId\`), INDEX \`IDX_0f3881cfe1ef94b0e435d1d72f\` (\`usersId\`), PRIMARY KEY (\`groupsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`group_message_attachments\` ADD CONSTRAINT \`FK_e3e4b147713098bbc5a3948c24b\` FOREIGN KEY (\`messageId\`) REFERENCES \`group_messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_messages\` ADD CONSTRAINT \`FK_a2d00b52e4e18a3686d68a155c0\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_messages\` ADD CONSTRAINT \`FK_8f9e67acada60b6ae7096c4f15f\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD CONSTRAINT \`FK_4147c690073a1c217af1169841b\` FOREIGN KEY (\`last_message_sent\`) REFERENCES \`group_messages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversations\` ADD CONSTRAINT \`FK_3a608098e0ab9bf5f8f54c4a093\` FOREIGN KEY (\`last_message_sent\`) REFERENCES \`messages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_attachments\` ADD CONSTRAINT \`FK_5b4f24737fcb6b35ffdd4d16e13\` FOREIGN KEY (\`messageId\`) REFERENCES \`messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_819e6bb0ee78baf73c398dc707f\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e5663ce0c730b2de83445e2fd19\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groups_users_users\` ADD CONSTRAINT \`FK_6320d5cbd6f7702b2e78d38d6b8\` FOREIGN KEY (\`groupsId\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`groups_users_users\` ADD CONSTRAINT \`FK_0f3881cfe1ef94b0e435d1d72f9\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`groups_users_users\` DROP FOREIGN KEY \`FK_0f3881cfe1ef94b0e435d1d72f9\``);
        await queryRunner.query(`ALTER TABLE \`groups_users_users\` DROP FOREIGN KEY \`FK_6320d5cbd6f7702b2e78d38d6b8\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e5663ce0c730b2de83445e2fd19\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_819e6bb0ee78baf73c398dc707f\``);
        await queryRunner.query(`ALTER TABLE \`message_attachments\` DROP FOREIGN KEY \`FK_5b4f24737fcb6b35ffdd4d16e13\``);
        await queryRunner.query(`ALTER TABLE \`conversations\` DROP FOREIGN KEY \`FK_3a608098e0ab9bf5f8f54c4a093\``);
        await queryRunner.query(`ALTER TABLE \`groups\` DROP FOREIGN KEY \`FK_4147c690073a1c217af1169841b\``);
        await queryRunner.query(`ALTER TABLE \`group_messages\` DROP FOREIGN KEY \`FK_8f9e67acada60b6ae7096c4f15f\``);
        await queryRunner.query(`ALTER TABLE \`group_messages\` DROP FOREIGN KEY \`FK_a2d00b52e4e18a3686d68a155c0\``);
        await queryRunner.query(`ALTER TABLE \`group_message_attachments\` DROP FOREIGN KEY \`FK_e3e4b147713098bbc5a3948c24b\``);
        await queryRunner.query(`DROP INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f3881cfe1ef94b0e435d1d72f\` ON \`groups_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6320d5cbd6f7702b2e78d38d6b\` ON \`groups_users_users\``);
        await queryRunner.query(`DROP TABLE \`groups_users_users\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`message_attachments\``);
        await queryRunner.query(`DROP INDEX \`REL_3a608098e0ab9bf5f8f54c4a09\` ON \`conversations\``);
        await queryRunner.query(`DROP INDEX \`IDX_761a5583cb503b1124b174e13f\` ON \`conversations\``);
        await queryRunner.query(`DROP TABLE \`conversations\``);
        await queryRunner.query(`DROP INDEX \`REL_4147c690073a1c217af1169841\` ON \`groups\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
        await queryRunner.query(`DROP TABLE \`group_messages\``);
        await queryRunner.query(`DROP TABLE \`group_message_attachments\``);
    }

}
