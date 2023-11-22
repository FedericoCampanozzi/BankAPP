import express from 'express';
import { Transaction } from '../entities/Transaction';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

router.get('/api/transaction/get',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
	const transactions = await createQueryBuilder()
                            .select(['id','amount'])
                            .from(Transaction, 't')
                            .getRawMany()
                            
	return res.json(transactions);
});

export { router as getTransactionRouter };
