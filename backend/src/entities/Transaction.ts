import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Client } from './Client';
import { BaseTable } from './utils/BaseTable';

@Entity('transaction')
export class Transaction extends BaseTable {
	@Column()
	type: number;

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