import express from 'express';
import { Transaction } from '../entities/Transaction';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';

const router = express.Router();

router.get('/api/transaction/get/:IdClient', async (req, res) => {    
	const transactions = await createQueryBuilder()
                            .select(['id','amount'])
                            .from(Transaction, 't')
                            .getRawMany()
                            
	return res.json(transactions);
});

export { router as transactionRoutes };
