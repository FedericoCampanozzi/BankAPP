import { Client } from "../entities/Client.entity";
import { Transaction, createQueryBuilder, getRepository } from "typeorm";

const fixUsersBalance = async function () {
  const clients: Client[] = await createQueryBuilder("client")
    .select([
      "id",
      "created_at",
      "updated_at",
      "first_name",
      "last_name",
      "email",
      "username",
      "password",
      "balance",
      "card_number",
      "is_active",
    ])
    .getRawMany();
  for (let ic = 0; ic < clients.length; ic++) {
    const result = await  createQueryBuilder('transaction', 't')
      .select([
        "SUM(CASE WHEN type_id IN (1, 3) THEN amount WHEN type_id = 2 THEN -amount END) as balance",
      ])
      .innerJoin("t.type", "transactiontype")
      .where(
        "(t.sender_id = :userId OR t.receiver_id = :userId)",
        { userId: clients[ic].id }
      )
      .getRawOne();

    clients[ic].balance = result["balance"];
    const client = await Client.findOne(clients[ic].id);
    if (client == undefined) throw new Error("client is undefined");
    client.balance = parseInt(result["balance"]);
    await client.reload();
  }
  console.log("Ended Post Procesing -- fixUsersBalance");
};

export { fixUsersBalance as fixUsersBalance };