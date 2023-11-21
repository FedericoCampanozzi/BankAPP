import path from "path";
import dotenv from "dotenv";
import { createConnection } from 'typeorm';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';

let envfile = "";
process.argv.forEach(function (val, index) {
  if(index == 2) envfile = val;
});

const p = path.resolve(__dirname, `../.env.${envfile}`);
console.log("Read ", p, " configuration");
dotenv.config({ path: p });

const connect = async () => {
  await createConnection({
    type: 'mysql',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : -1,
    host: process.env.HOST ? String(process.env.HOST) : "",
    database: process.env.DB_NAME ? String(process.env.DB_NAME) : "",
    username: process.env.DB_USER ? String(process.env.DB_USER) : "",
    password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : "",
    entities: [Client, Banker, Transaction],
		synchronize: true,
  });
};

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : -1;

export { connect as connect };
export { SERVER_PORT as SERVER_PORT};