import { define } from "typeorm-seeding";
import { Transaction } from '../../entities/Transaction.entity';

define(Transaction, () => {
  const transaction = new Transaction();
  return transaction;
});