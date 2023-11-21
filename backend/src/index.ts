import express from 'express';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { createTransactionRouter } from './routes/create_transaction';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientsRouter } from './routes/fetch_clients';
import { SERVER_PORT, connect } from './connect';

const app = express();

const main = async () => {
	try {
		await connect();
		console.log('Connected to database');

		app.use(express.json());

		app.use(createClientRouter);
		app.use(createBankerRouter);
		app.use(connectBankerToClientRouter);
		app.use(createTransactionRouter);
		app.use(deleteClientRouter);
		app.use(fetchClientsRouter);

		app.listen(SERVER_PORT, () => {
			console.log('Now server is running on port', SERVER_PORT);
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();