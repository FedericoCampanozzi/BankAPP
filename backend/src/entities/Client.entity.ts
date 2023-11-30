import {
	Entity,
	Column,
	OneToMany
} from 'typeorm';
import { Transaction } from './Transaction.entity';
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