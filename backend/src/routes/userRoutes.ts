import express from 'express';
import { Banker } from '../entities/Banker.entity';
import { Client } from '../entities/Client.entity';
import { Person } from '../entities/utils/Person';
import { createQueryBuilder, getRepository } from 'typeorm';

const router = express.Router();

router.post('/api/login/post', async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const isClient  = await createQueryBuilder('client')
        .where('client.username = :us AND client.password = :pwd', {
            us: Username, 
            pwd: Password
        }).getOne();

    const isBanker  = await createQueryBuilder('banker')
        .where('banker.username = :us AND banker.password = :pwd', {
            us: Username, 
            pwd: Password
        }).getOne();
    
    let role = "NotFound";
    
    if(isClient != undefined) role = "Client";
    else if(isBanker != undefined) role = "Banker";

    return res.json({ role : role, ifBanker : isBanker, ifClient : isClient });
});

router.put("/api/user/update", async (req, res) => {
    const user_data: Person = req.body.User;
    const is_client = req.body.IsClient;

    let user_db: any = undefined;

    if(is_client) {
        user_db = await createQueryBuilder('client')
                        .where("id = :Id", { Id: user_data.id })
                        .getOne();

    } else {
        user_db = await createQueryBuilder('banker')
                        .where("id = :Id", { Id: user_data.id })
                        .getOne();
    }

    if(user_db != undefined){
        user_db.first_name = user_data.first_name;
        user_db.last_name = user_data.last_name;
        user_db.email = user_data.email;
        user_db.reload();
        return res.json({ message : "ok" });
    } else {
        throw new Error("user_db is undefined")
    }
});

export { router as userRoutes };