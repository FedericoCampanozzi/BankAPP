import { faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";
import { Transaction } from '../entities/Transaction';

define(Transaction, (faker) => {
  const transaction = new Transaction();
  transaction.type = Math.random()%2;
  transaction.amount = Number(Math.random()%2000/2);
  return transaction;
});