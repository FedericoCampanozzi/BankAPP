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
		unique: true,
		length: 10
	})
	card_number: string;

	@Column({
		name: 'active',
		default: true,
	})
	is_active: boolean;
	
	@OneToMany(
		() => Transaction,
		(transaction) => transaction.sender
	)
	s_transactions: Transaction[];
	
	@OneToMany(
		() => Transaction,
		(transaction) => transaction.receiver
	)
	r_transactions: Transaction[];
}