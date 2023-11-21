import { createConnection } from 'typeorm';
import express from 'express';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { createTransactionRouter } from './routes/create_transaction';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientsRouter } from './routes/fetch_clients';
import connection from './config';

//require('dotenv').config()

const app = express();

//console.log("connection.DB_TYPE", connection.DB_TYPE);
/*
const mysql = {
	type: DB_TYPE,
	host: HOST,
	port: PORT,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	insecureAuth : true,
	entities: [Client, Banker, Transaction],
	synchronize: true,
};
*/

const main = async () => {
	try {
		await createConnection({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'bank',
			entities: [Client, Banker, Transaction],
			synchronize: true,
		});
		console.log('Connected to database');

		app.use(express.json());

		app.use(createClientRouter);
		app.use(createBankerRouter);
		app.use(connectBankerToClientRouter);
		app.use(createTransactionRouter);
		app.use(deleteClientRouter);
		app.use(fetchClientsRouter);
		
		console.log("connection.MONGO_URI=",connection.MONGO_URI);

		app.listen(8080, () => {
			console.log('Now running on port ', 8080);
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();