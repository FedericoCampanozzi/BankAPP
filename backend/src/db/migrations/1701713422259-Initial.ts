import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1701713422259 implements MigrationInterface {
    name = 'Initial1701713422259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(256) NOT NULL, \`balance\` decimal(6,2) NOT NULL, \`card_number\` varchar(10) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), UNIQUE INDEX \`IDX_19385ccaeac3753e24d2eed6a4\` (\`username\`), UNIQUE INDEX \`IDX_bc0c644bf2e06d38466b66ecd6\` (\`card_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transactiontype\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` decimal(6,2) NOT NULL, \`sender_id\` int NULL, \`receiver_id\` int NULL, \`banker_id\` int NULL, \`type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(256) NOT NULL, \`employee_number\` varchar(10) NOT NULL, UNIQUE INDEX \`IDX_c1944a58f7ecf3afbfe2317372\` (\`email\`), UNIQUE INDEX \`IDX_d15c2647b457e55f1a8ffe6b08\` (\`username\`), UNIQUE INDEX \`IDX_277df013559cb6637ad9a5fe31\` (\`employee_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_91a42be8fb1ac791a24fdf65048\` FOREIGN KEY (\`sender_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_7f8c694d3eb02b8fc73d85b0330\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_1fc5317214012a7931969dda8ac\` FOREIGN KEY (\`banker_id\`) REFERENCES \`banker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_e4e15bcea926d360cfeea703c36\` FOREIGN KEY (\`type_id\`) REFERENCES \`transactiontype\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_e4e15bcea926d360cfeea703c36\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_1fc5317214012a7931969dda8ac\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_7f8c694d3eb02b8fc73d85b0330\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_91a42be8fb1ac791a24fdf65048\``);
        await queryRunner.query(`DROP INDEX \`IDX_277df013559cb6637ad9a5fe31\` ON \`banker\``);
        await queryRunner.query(`DROP INDEX \`IDX_d15c2647b457e55f1a8ffe6b08\` ON \`banker\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1944a58f7ecf3afbfe2317372\` ON \`banker\``);
        await queryRunner.query(`DROP TABLE \`banker\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transactiontype\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc0c644bf2e06d38466b66ecd6\` ON \`client\``);
        await queryRunner.query(`DROP INDEX \`IDX_19385ccaeac3753e24d2eed6a4\` ON \`client\``);
        await queryRunner.query(`DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
    }

}
