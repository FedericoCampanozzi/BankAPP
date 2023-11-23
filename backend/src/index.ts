import express from 'express';
import { SERVER_PORT, connect } from './connect';

/* ROUTES */
import { clientRoutes } from './routes/clientRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
/* ****** */
const app = express();

const main = async () => {
	try {
		await connect();
		console.log('Connected to database');

		app.use(express.json());

		app.use(clientRoutes);
		app.use(transactionRoutes);

		app.listen(SERVER_PORT, () => {
			console.log('Now server is running on port', SERVER_PORT);
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();