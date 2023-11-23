import {
	Entity,
	Column
} from 'typeorm';
import { BaseTable } from './BaseTable';

@Entity()
export class Person extends BaseTable {
	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({
		unique: true
	})
	email: string;

	@Column({
		unique: true,
		length: 10
	})
	card_number: string;
}