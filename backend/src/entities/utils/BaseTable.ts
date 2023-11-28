import {
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity
} from 'typeorm';

export class BaseTable extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}