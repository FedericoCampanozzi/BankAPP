import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { TransactionType } from "./entities/TransactionType";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    /*
    const users = await factory(User)().createMany(15);
    await factory(Post)()
      .map(async (post) => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(100);
    */
    const clients = await factory(Client)().createMany(15);
    const bankers = await factory(Banker)().createMany(15);
    const t_types = await factory(TransactionType)().createMany(3);

    await factory(Transaction)()
      .map(async (transaction) => {
        const rnd_type = t_types[Math.floor(Math.random() * t_types.length)];
        const rnd_sender = clients[Math.floor(Math.random() * clients.length)];
        let rnd_receiver = undefined;
        
        transaction.sender = rnd_sender;
        transaction.type = rnd_type;

        do {
          rnd_receiver = clients[Math.floor(Math.random() * clients.length)];
        } while(rnd_sender === rnd_receiver);
        
        if(Math.random() % 3 == 0) {
          transaction.banker = bankers[Math.floor(Math.random() * bankers.length)];
        } else {
          transaction.banker = undefined;
        }

        if(rnd_type.id != 2){
          transaction.receiver = undefined;
        } else {
          transaction.sender = rnd_sender;
          transaction.receiver = rnd_receiver;
        }
        return transaction;
      }).createMany(1000);
  }
}
