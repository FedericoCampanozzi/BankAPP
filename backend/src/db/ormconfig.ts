import path from "path";
import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

let envfile = "";
process.argv.forEach(function (val, index) {
  if(index == 2) envfile = val;
});

const p = path.resolve(__dirname, `../../.env.${envfile}`);
console.log("Read ", p, " configuration");
dotenv.config({ path: p });

let configuration: ConnectionOptions;
const entities = [path.join(__dirname, "..", "entities", "**", "*.*"), path.join(__dirname, "..", "entities", "*.*")];

if(envfile == "mysql") {
  configuration = {
    type: 'mysql',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : -1,
    host: process.env.HOST ? String(process.env.HOST) : "",
    database: process.env.DB_NAME ? String(process.env.DB_NAME) : "",
    username: process.env.DB_USER ? String(process.env.DB_USER) : "",
    password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : "",
    dropSchema: false,
    entities: entities,
    synchronize: true
  };
} else if(envfile == "_sqlite"){
  configuration = {
    type: 'sqlite',
    database: process.env.DB_PATH ? path.resolve(__dirname, String(process.env.DB_PATH)) : "",
    dropSchema: false,
    entities: entities,
    synchronize: true
  };
} else if(envfile == "postgres"){
  configuration = {
    type: 'postgres',
    replication:{
      master:{
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : -1,
        host: process.env.HOST ? String(process.env.HOST) : "",
        database: process.env.DB_NAME ? String(process.env.DB_NAME) : "",
        username: process.env.DB_USER ? String(process.env.DB_USER) : "",
        password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : ""          
      },
      slaves:[]
    },
    dropSchema: false,
    entities: entities,
    synchronize: true
  }
}

export { configuration as configuration};