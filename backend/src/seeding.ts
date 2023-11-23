import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";

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

    await factory(Transaction)()
      .map(async (transaction) => {
        transaction.client = clients[Math.floor(Math.random() * clients.length)];
        return transaction;
      }).createMany(1000);
  }
}
