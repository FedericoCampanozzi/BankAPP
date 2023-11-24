import {
	Entity,
	Column,
	OneToMany,
} from 'typeorm';
import { Person } from './utils/Person';
import { Transaction } from './Transaction';

@Entity('banker')
export class Banker extends Person {
	@Column({
		length: 10,
		unique: true
	})
	employee_number: string;
	
	@OneToMany(
		() => Transaction,
		(transaction) => transaction.banker
	)
	transactions: Transaction[];
}