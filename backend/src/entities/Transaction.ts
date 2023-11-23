import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Client } from './Client';
import { BaseTable } from './utils/BaseTable';
import { TransactionType } from './TransactionType';
import { Banker } from './Banker';
@Entity('transaction')
export class Transaction extends BaseTable {
	@Column({
		type: 'numeric',
	})
	amount: number;

	@ManyToOne(
		() => Client,
		(client) => client.transactions,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'sender_id',
	})
	sender: Client;

	@ManyToOne(
		() => Client,
		(client) => client.transactions,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'receiver_id'
	})
	receiver: Client;

	@ManyToOne(
		() => Client,
		(client) => client.transactions,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'banker_id'
	})
	banker: Banker;

	@ManyToOne(
		() => TransactionType,
		(transactionType) => transactionType.transactions,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'type_id',
	})
	type: TransactionType;
}