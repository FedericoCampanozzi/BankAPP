import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Client } from './Client.entity';
import { BaseTable } from './utils/BaseTable';
import { TransactionType } from './TransactionType.entity';
import { Banker } from './Banker.entity';

@Entity('transaction')
export class Transaction extends BaseTable {
	@Column({
		type: 'numeric',
	})
	amount: number;

	@ManyToOne(
		() => Client,
		(client) => client.s_transactions
	)
	@JoinColumn({
		name: 'sender_id',
	})
	sender: Client;

	@ManyToOne(
		() => Client,
		(client) => client.r_transactions
	)
	@JoinColumn({
		name: 'receiver_id',
	})
	receiver?: Client;

	@ManyToOne(
		() => Banker,
		(banker) => banker.transactions
	)
	@JoinColumn({
		name: 'banker_id'
	})
	banker?: Banker;

	@ManyToOne(
		() => TransactionType,
		(transactionType) => transactionType.transactions
	)
	@JoinColumn({
		name: 'type_id',
	})
	type: TransactionType;
}