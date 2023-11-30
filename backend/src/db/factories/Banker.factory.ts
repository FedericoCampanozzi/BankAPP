import { define } from "typeorm-seeding";
import { Banker } from "../../entities/Banker.entity";
import { UtilityFunctions } from "../../utils";

define(Banker, () => {
  const banker = new Banker();
  banker.first_name = UtilityFunctions.getFakeName(10);
  banker.last_name = UtilityFunctions.getFakeName(10);
  banker.email = UtilityFunctions.getFakeName(20);
  banker.username = UtilityFunctions.getFakeName(5);
  banker.password = UtilityFunctions.getFakeName(5);
  banker.employee_number = UtilityFunctions.getFakeNumber().toString();
  return banker;
});