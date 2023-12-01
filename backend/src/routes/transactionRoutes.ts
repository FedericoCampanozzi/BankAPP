import express from 'express';
import { Transaction } from '../entities/Transaction.entity';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client.entity';
import { TransactionType } from '../entities/TransactionType.entity';

const router = express.Router();

router.get('/api/transaction/get/:IdClient', async (req, res) => {    
	const transactions = await  createQueryBuilder()
                                .select([
                                    't.id as id',
                                    't.created_at as created_at',
                                    't.updated_at as updated_at',
                                    't.amount as amount',
                                    'tt.name as tt_name',
                                    'tt.id as tt_id',
                                    's.username as sender',
                                    'r.username as receiver',
                                    'b.username as banker',
                                    'b.employee_number as banker_employee_number',
                                ])
                                .from(Transaction, 't')
                                .innerJoin('transactiontype', 'tt', 't.type_id = tt.id')
                                .innerJoin('client', 's', 't.sender_id = s.id')
                                .leftJoin('client', 'r', 't.receiver_id = r.id')
                                .leftJoin('banker', 'b', 't.banker_id = b.id')
                                //.where('t.sender_id = :Id OR -1 = :Id', { Id: req.params.IdClient })
                                .limit(50)
                                .getRawMany();
                            
	return res.json({transactions: transactions});
});

router.get('/api/transaction-type/get/all', async (req, res) => {
	const transactionTypes = await createQueryBuilder('transactiontype').getRawMany()
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
});

export { router as transactionRoutes };
