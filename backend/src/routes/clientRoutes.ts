import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client.entity';

const router = express.Router();

router.get('/api/client/get/all', async (req, res) => {    
	const clients = await createQueryBuilder('client').getRawMany();
	return res.json({clients : clients});
});

router.post('/api/client/get-balance', async (req, res) => {
	const ClientID = req.body.ClientID;
});

export { router as clientRoutes };