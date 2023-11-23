import {
	Entity,
	Column,
	OneToMany,
	ManyToMany,
} from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {
	@Column({
		type: 'numeric',
	})
	balance: number;

	@Column({
		name: 'active',
		default: true,
	})
	is_active: boolean;
	
	@OneToMany(
		() => Transaction,
		(transaction) => transaction.client
	)
	transactions: Transaction[];
}