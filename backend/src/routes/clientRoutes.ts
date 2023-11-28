import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';

const router = express.Router();

router.get('/api/client/get/all', async (req, res) => {    
	const clients = await createQueryBuilder()
                            .select()
                            .from(Client, 'c')
                            .getRawMany()
                            
	return res.json(clients);
});


export { router as clientRoutes };