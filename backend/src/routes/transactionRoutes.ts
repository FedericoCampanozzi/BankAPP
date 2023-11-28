import express from 'express';
import { Transaction } from '../entities/Transaction';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';
import { TransactionType } from '../entities/TransactionType';

const router = express.Router();

router.get('/api/transaction/get/:IdClient', async (req, res) => {    
	const transactions = await createQueryBuilder()
                            .select(['t.id as tid','t.created_at','t.amount',
                                     'tt.id as ttid','tt.name as ttname',
                                     's.name as sender',
                                     'r.name as receiver',
                                     'b.name as banker',
                                     'b.employee_number'])
                            .from(Transaction, 't')
                            .innerJoin('t.type_id','tt')
                            .innerJoin('t.sender_id','s')
                            .leftJoin('t.client_id','r')
                            .leftJoin('t.banker_id','b')
                            .where('t.Id = :Id', {Id: req.params.IdClient}).orWhere(':Id = -1', {Id: req.params.IdClient})
                            .getRawMany()
                            
	return res.json(transactions);
});

router.get('/api/transaction-type/get/all', async (req, res) => {    
	const transactionTypes = await createQueryBuilder()
                            .select()
                            .from(TransactionType, 'tt')
                            .getRawMany()
                            
	return res.json(transactionTypes);
});

router.put('/api/transaction/put/:IdClientSender/:IdClientReceiver', async (req, res) => {
    const { IdClientSender, IdClientReceiver } = req.params;
    
    const ids = parseInt(IdClientSender);
    const idr = parseInt(IdClientReceiver);
    
    const { type, amount } = req.body;

    const sender = await Client.findOne(ids);
    const receiver = await Client.findOne(idr);

    if ((!sender || ids == -1) || (!receiver || idr == -1)) {
        return res.json({msg: 'Sender or Receiver not found'});
    }

    const transaction = await Transaction.create({
        amount,
        type,
        sender,
    });

    await transaction.save();

    if (type == 0 && ids != -1 && idr == -1) {
        // 0 = deposit => A client want to deposit some money in his current account
        sender.balance = sender.balance + amount;
        sender.s_transactions = [transaction];
        await sender.save();
    } else if (type === 1 && ids != -1 && idr == -1) {
        // 1 = withdraw => A client want to take some money from his current account
        sender.balance = sender.balance - amount;
        sender.s_transactions = [transaction];
        await sender.save();
    } else if (type === 2 && ids != -1 && idr != -1){
        // 2 = transfer => A client want to pay someone
        sender.balance = sender.balance - amount;
        receiver.balance = receiver.balance + amount;
        sender.s_transactions = [transaction];
        receiver.r_transactions = [transaction];
        await sender.save();
        await receiver.save();
    } else {
        return res.json({msg: 'Wrong transaction type'});
    }
    return res.json("transaction insert successfully");
}
);

router.delete('/api/transaction/delete', async (req, res) => {
    const IdTransaction = req.body.IdTransaction;
});

export { router as transactionRoutes };
