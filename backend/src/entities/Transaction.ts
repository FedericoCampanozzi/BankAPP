import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Client } from './Client';
import { BaseTable } from './utils/BaseTable';

export enum TransactionType {
	DEPOSIT = 'deposit',
	WITHDRAW = 'withdraw',
}

@Entity('transaction')
export class Transaction extends BaseTable {
	@Column({
		type: 'enum',
		enum: TransactionType,
	})
	type: string;

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
		name: 'client_id',
	})
	client: Client;
}