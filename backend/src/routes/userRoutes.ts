import express from 'express';
import { Transaction } from '../entities/Transaction';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.post('/api/login/post/Username/:Username/Password/:Password', async (req, res) => {
    return res.json({ role : 'AAAAAAAAAAAAAAAHHH' });
    const { Username, Password } = req.params;

    const isUser  = await createQueryBuilder()
        .select(['id'])
        .from(Client, 'c')
        .getOne()

    const isBanker  = await createQueryBuilder()
        .select(['id'])
        .from(Banker, 'b')
        .getOne()
    
    const role = isUser == undefined ? (isBanker == undefined ? 'none' : 'Banker') : 'User';
	
    return res.json({ role : role });
});

export { router as userRoutes };