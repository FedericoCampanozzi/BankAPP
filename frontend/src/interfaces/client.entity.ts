import { Person } from "./person.entity";

export class Client extends Person {
    cardnumber?: string;
    balance?: number;
    is_active?: boolean;
}