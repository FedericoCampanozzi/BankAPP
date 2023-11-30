import { define } from "typeorm-seeding";
import { Transaction } from '../../entities/Transaction.entity';

define(Transaction, () => {
  const transaction = new Transaction();
  transaction.amount = Number(Math.random()%2000/2);
  return transaction;
});