import express from 'express';
import { createQueryBuilder } from 'typeorm';

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
    /*
    console.log("Username = ", Username, 
                "Password = ", Password, 
                "isClient = ", isClient, 
                "isBanker = ", isBanker);
    */
    if(isClient != undefined) role = "Client";
    else if(isBanker != undefined) role = "Banker";

    return res.json({ role : role, ifBanker : isBanker, ifClient : isClient });
});

export { router as userRoutes };