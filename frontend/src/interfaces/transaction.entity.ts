import { BaseTable } from "./baseTable.etity";

export class Transaction extends BaseTable {
    amount?: number;
    tt_id?: number;
    sender?: string;
    receiver?: string;
    banker?: string;
    banker_employee_number?: string;
}