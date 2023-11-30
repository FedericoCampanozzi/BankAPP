import { Client } from "../../entities/Client.entity";
import { define } from "typeorm-seeding";
import { UtilityFunctions } from "../../utils";

define(Client, () => {
  const client = new Client();
  client.first_name = UtilityFunctions.getFakeName(10);
  client.last_name = UtilityFunctions.getFakeName(10);
  client.email = UtilityFunctions.getFakeName(10);
  client.username = UtilityFunctions.getFakeName(5);
  client.password = UtilityFunctions.getFakeName(5);
  client.balance = 0;
  client.card_number = UtilityFunctions.getFakeCardNumber(5);
  client.is_active = true;
  return client;
});