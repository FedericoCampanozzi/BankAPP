import express from 'express';
import { Transaction } from '../entities/Transaction.entity';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { TransactionType } from '../entities/TransactionType.entity';

const router = express.Router();

router.get('/api/transaction/get/:IdClient', async (req, res) => {    
	const transactions = await  createQueryBuilder('transaction')
                                .select([
                                    'transaction.id as id',
                                    'transaction.created_at as created_at',
                                    'transaction.updated_at as updated_at',
                                    'transaction.amount as amount',
                                    '"" as tt_name',
                                    'transaction.type_id as tt_id',
                                    's.username as sender',
                                    'r.username as receiver',
                                    'b.username as banker',
                                    'b.employee_number as banker_employee_number',
                                ])
                                .innerJoin('client', 's', 'transaction.sender_id = s.id')
                                .leftJoin('client', 'r', 'transaction.receiver_id = r.id')
                                .leftJoin('banker', 'b', 'transaction.banker_id = b.id')
                                .where('transaction.sender_id = :Id OR -1 = :Id', { Id: req.params.IdClient })
                                .orderBy('transaction.id')
                                .getRawMany();
	return res.json({transactions: transactions});
});

router.get('/api/transaction-type/get/all', async (req, res) => {
	const transactionTypes = await createQueryBuilder('transactiontype').getRawMany();
	return res.json({transactionTypes : transactionTypes});
});

router.put('/api/transaction/put', async (req, res) => {
    const { type, Sender, Receiver, Banker, Amount, IsClient } = req.body;
    
    const ids = parseInt(Sender);
    const idr = parseInt(Receiver);
    
    const sender = await Client.findOne(ids);
    const receiver = await Client.findOne(idr);
    let banker = null;
    const transactiontype = await TransactionType.findOne(parseInt(type));

    if(IsClient) banker = await Banker.findOne(parseInt(Banker));

    if ((!sender || ids == -1) || (!receiver || idr == -1)) {
        return res.json({ msg : "Sender or Receiver not found" });
    }

    if(transactiontype == undefined){
        return res.json({ msg : "TransactionType undefined" });
    }

    const transaction = await new Transaction();

    transaction.type = transactiontype;
    transaction.sender = sender;
    transaction.receiver = receiver;
    if(IsClient) transaction.banker = banker;
    else transaction.banker = undefined;
    transaction.amount = Amount;

    await transaction.save();

    if (type == 0 && ids != -1 && idr == -1) {
        // 0 = deposit => A client want to deposit some money in his current account
        sender.balance = sender.balance + Amount;
        sender.s_transactions = [transaction];
        await sender.save();
    } else if (type === 1 && ids != -1 && idr == -1) {
        // 1 = withdraw => A client want to take some money from his current account
        sender.balance = sender.balance - Amount;
        sender.s_transactions = [transaction];
        await sender.save();
    } else if (type === 2 && ids != -1 && idr != -1){
        // 2 = transfer => A client want to pay someone
        sender.balance = sender.balance - Amount;
        receiver.balance = receiver.balance + Amount;
        sender.s_transactions = [transaction];
        receiver.r_transactions = [transaction];
        await sender.save();
        await receiver.save();
    } else {
        return res.json({ msg : "Wrong transaction type" });
    }
    return res.json({ msg : "transaction insert successfully" });
}
);

router.post('/api/transaction/delete', async (req, res) => {
    const { IdTransaction } = req.body.IdTransaction;
    const transaction = await Transaction.findOne(parseInt(IdTransaction));
    await transaction?.remove();
    res.json({ msg : "ok" });
});

export { router as transactionRoutes };
