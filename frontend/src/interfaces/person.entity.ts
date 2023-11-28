import { BaseTable } from "./baseTable.etity";

export class Person extends BaseTable {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
}