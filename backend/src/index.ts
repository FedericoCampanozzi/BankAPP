import express from 'express';
import { Request } from "express";
import { SERVER_PORT, connect } from './connect';

/* ROUTES */
import { clientRoutes } from './routes/clientRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
import { userRoutes } from './routes/userRoutes';
/* ****** */

import cors = require("cors");
const app = express();

const main = async () => {
	try {
		await connect();
		console.log('Connected to database');

		app.use(express.json());
		app.use(cors<Request>());

		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader(
			  "Access-Control-Allow-Methods",
			  "OPTIONS,GET,POST,PUT,PATCH,DELETE"
			);
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
			next();
		  }
		);

		app.use(clientRoutes);
		app.use(transactionRoutes);
		app.use(userRoutes);

		app.listen(SERVER_PORT, () => {
			console.log('Now server is running on port', SERVER_PORT);
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();