import { define } from "typeorm-seeding";
import { TransactionType } from '../../entities/TransactionType.entity';

define(TransactionType, () => {
  const transactionType = new TransactionType();
  transactionType.name = "A";
  transactionType.description = "lorem";
  return transactionType;
});