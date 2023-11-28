import { define } from "typeorm-seeding";
import { TransactionType } from '../../entities/TransactionType';

define(TransactionType, () => {
  const transactionType = new TransactionType();
  transactionType.name = "A";
  transactionType.description = "lorem";
  return transactionType;
});