import { Factory, Seeder } from "typeorm-seeding";
import { Connection, createQueryBuilder } from "typeorm";
import { Banker } from "./entities/Banker.entity";
import { Client } from "./entities/Client.entity";
import { Transaction } from "./entities/Transaction.entity";
import { TransactionType } from "./entities/TransactionType.entity";
import { UtilityFunctions } from "./utils";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Client)().createMany(15);
    await factory(Banker)().createMany(15);

    await factory(TransactionType)().create({
      name: "DEPOSIT",
      description: "put some money in yuor cc (+)"
    });
    await factory(TransactionType)().create({
      name: "WITHDRAW",
      description: "take some money from yuor cc (-)"
    });
    await factory(TransactionType)().create({
      name: "TRANSFER",
      description: "give to someone some money from yuor cc ((+),(-))"
    });

    const t_types = await createQueryBuilder('transactiontype')
                          .select(['id','created_at','updated_at','name','description'])
                          .getRawMany();
    const clients = await createQueryBuilder('client')
                          .select(['id','created_at','updated_at','first_name','last_name',
                            'email','username','password','balance','card_number','is_active'])
                          .getRawMany();
    const bankers = await createQueryBuilder('banker')
                          .select(['id','created_at','updated_at','first_name','last_name',
                            'email','username','password','employee_number'])
                          .getRawMany();
    
    await factory(Transaction)()
      .map(async (transaction) => {
        const rnd_type = t_types[Math.floor(Math.random() * t_types.length)];
        const rnd_sender = clients[Math.floor(Math.random() * clients.length)];
        let rnd_receiver = undefined;
        
        transaction.created_at = UtilityFunctions.getFakeDate();
        transaction.sender = rnd_sender;
        transaction.type = rnd_type;
        transaction.amount = UtilityFunctions.getFakeNumberBetween(10000, 500000) / 100.00;
        
        do {
          rnd_receiver = clients[Math.floor(Math.random() * clients.length)];
        } while(rnd_sender.id == rnd_receiver.id);
        
        if(Math.floor(Math.random()*3) == 0) {
          transaction.banker = bankers[Math.floor(Math.random() * bankers.length)];
        } else {
          transaction.banker = undefined;
        }

        if(rnd_type.id != 3){
          transaction.receiver = undefined;
        } else {
          transaction.sender = rnd_sender;
          transaction.receiver = rnd_receiver;
        }
        return transaction;
      }).createMany(1000);
  }
}
