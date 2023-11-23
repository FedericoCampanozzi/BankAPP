import { define } from "typeorm-seeding";
import { Banker } from "../entities/Banker";

define(Banker, (faker) => {
  const banker = new Banker();
  banker.first_name = "A";
  banker.email = "B";
  banker.card_number = (Number(Math.random()%100000000000/2)).toString();
  banker.employee_number = (Number(Math.random()%100000000000/2)).toString();
  return banker;
});