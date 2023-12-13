import express from 'express';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

router.get('/api/client/get/all', async (req, res) => {    
	const clients = await createQueryBuilder('client').getRawMany();
	return res.json({clients : clients});
});

router.post('/api/client/get-balance', async (req, res) => {
	const ClientID = req.body.ClientID;
	const result = await  createQueryBuilder('transaction', 't')
		.select([
			"SUM(CASE WHEN type_id IN (1, 3) THEN amount WHEN type_id = 2 THEN -amount END) as balance",
		])
		.innerJoin("t.type", "transactiontype")
		.where("(t.sender_id = :userId OR t.receiver_id = :userId)", { userId: ClientID })
		.getRawOne();
  return res.json({balance : result["balance"]});
});

export { router as clientRoutes };