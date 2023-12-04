import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedRandomColumn1701714757263 implements MigrationInterface {
    name = 'RemovedRandomColumn1701714757263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9bd669a288db6d184f18f7926a\` ON \`banker\``);
        await queryRunner.query(`ALTER TABLE \`banker\` DROP COLUMN \`random_clm\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banker\` ADD \`random_clm\` varchar(10) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9bd669a288db6d184f18f7926a\` ON \`banker\` (\`random_clm\`)`);
    }

}
