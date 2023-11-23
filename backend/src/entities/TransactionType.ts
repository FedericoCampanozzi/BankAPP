import {
	Entity,
	Column,
    OneToMany
} from 'typeorm';
import { BaseTable } from './utils/BaseTable';
import { Transaction } from './Transaction';

@Entity('transactionType')
export class TransactionType extends BaseTable {
	@Column()
	name: string;
    
    @Column()
	description: string;

    @OneToMany(
		() => Transaction,
		(transaction) => transaction.type
	)
	transactions: Transaction[];
}