import { createConnection } from 'typeorm';
import { configuration } from "./db/ormconfig";

let connect = async () => { await createConnection(configuration) };

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : -1;

export { connect as connect };
export { SERVER_PORT as SERVER_PORT};