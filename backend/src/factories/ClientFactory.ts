import { Client } from "../entities/Client";
import { define } from "typeorm-seeding";

define(Client, () => {
  const client = new Client();
  client.first_name = "A";
  client.email = "B";
  client.card_number = (Number(Math.random()%100000000000/2)).toString();
  client.balance = 0;
  client.is_active = true;
  client.username = "ABCD";
  client.password = "password"
  return client;
});