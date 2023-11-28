import { BaseTable } from "./baseTable.etity";

export class Client extends BaseTable {
    cardnumber?: string;
    balance?: number;
    is_active?: boolean;
}