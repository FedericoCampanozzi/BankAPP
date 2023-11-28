import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.post('/api/login/post', async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const isClient  = await createQueryBuilder()
        .select()
        .from(Client, 'c')
        .where('c.username = :us AND c.password = :pwd', {
            us: Username, 
            pwd: Password
        }).getOne();

    const isBanker  = await createQueryBuilder()
        .select()
        .from(Banker, 'b')
        .where('b.username = :us AND b.password = :pwd', {
            us: Username, 
            pwd: Password
        }).getOne();
    
    let role = "NotFound";
    console.log("isClient = ", isClient, "isBanker = ", isBanker);
    if(isClient != undefined) role = "Client";
    else if(isBanker != undefined) role = "Banker";

    return res.json({ role : role, ifBanker : isBanker, ifClient : isClient });
});

export { router as userRoutes };