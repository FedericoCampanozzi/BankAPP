import express from 'express';
import { Transaction } from '../entities/Transaction.entity';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { TransactionType } from '../entities/TransactionType.entity';
import { Banker } from '../entities/Banker.entity';

const router = express.Router();

router.get('/api/transaction/get/:IdUser/:Role', async (req, res) => {    
    const where_cond = req.params.Role == "Client" ? 't.sender_id = :Id OR t.receiver_id = :Id' : 't.banker_id = :Id';

	const transactions = await  createQueryBuilder('transaction', 't')
                                .select([
                                    't.id as id',
                                    't.created_at as created_at',
                                    't.updated_at as updated_at',
                                    't.amount as amount',
                                    't.type_id as tt_id',
                                    's.username as sender',
                                    'r.username as receiver',
                                    'b.username as banker',
                                    'b.employee_number as banker_employee_number',
                                ])
                                .innerJoin('client', 's', 't.sender_id = s.id')
                                .leftJoin('client', 'r', 't.receiver_id = r.id')
                                .leftJoin('banker', 'b', 't.banker_id = b.id')
                                .where(where_cond, { Id: req.params.IdUser })
                                .addOrderBy('t.created_at')
                                .getRawMany();
	return res.json({transactions: transactions});
});

router.get('/api/transaction-type/get/all', async (req, res) => {
	const transactionTypes = await createQueryBuilder('transactiontype').getRawMany();
	return res.json({transactionTypes : transactionTypes});
});

router.post('/api/transaction/post', async (req, res) => {
    const { TransactionTypeID, Sender, Receiver, BankerID, Amount, Role } = req.body;

    const isClient = Role == "Client";
    const ids = parseInt(Sender);
    const idr = parseInt(Receiver);
    
    const sender = await Client.findOne(ids);
    const receiver = await Client.findOne(idr);
    let banker = null;
    const transactionType = await TransactionType.findOne(parseInt(TransactionTypeID));

    if(!isClient) banker = await Banker.findOne(parseInt(BankerID));

    if ((!sender || ids == -1) || (!receiver || idr == -1)) {
        return res.json({ msg : "Sender or Receiver not found" });
    }

    if(transactionType == undefined || banker == undefined){
        return res.json({ msg : "TransactionType undefined" });
    }

    const transaction = new Transaction();

    transaction.type = transactionType;
    transaction.sender = sender;
    if(TransactionTypeID == 1) transaction.receiver = undefined;
    else transaction.receiver = receiver;
    if(!isClient) transaction.banker = banker;
    else transaction.banker = undefined;
    transaction.amount = Amount;

    await transaction.save();
    return res.json({ msg : "transaction insert successfully" });
}
);

router.delete('/api/transaction/delete/:IdTransaction', async (req, res) => {
    const IdTransaction = req.params.IdTransaction;
    const transaction = await Transaction.findOne(parseInt(IdTransaction));
    await transaction?.remove();
    res.json({ msg : "ok" });
});

export { router as transactionRoutes };
