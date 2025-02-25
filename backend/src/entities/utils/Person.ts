import {
	Column
} from 'typeorm';
import { BaseTable } from './BaseTable';

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
		unique: true
	})
	username: string;
	
	@Column({
		length: 256
	})
	password: string;
}