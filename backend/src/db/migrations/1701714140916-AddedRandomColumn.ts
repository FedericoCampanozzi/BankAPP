import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRandomColumn1701714140916 implements MigrationInterface {
    name = 'AddedRandomColumn1701714140916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banker\` ADD \`random_clm\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`banker\` ADD UNIQUE INDEX \`IDX_22337af7e53cbca85a466fb5f5\` (\`random_clm\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banker\` DROP INDEX \`IDX_22337af7e53cbca85a466fb5f5\``);
        await queryRunner.query(`ALTER TABLE \`banker\` DROP COLUMN \`random_clm\``);
    }

}
