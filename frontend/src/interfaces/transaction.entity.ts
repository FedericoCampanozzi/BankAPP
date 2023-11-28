import { BaseTable } from "./baseTable.etity";

export class Transaction extends BaseTable {
    amount?: number;
    nameTT?: string;
    idTT?: number;
    senderName?: string;
    receiverName?: string;
    bankerName?: string;
    bankerNumber?: string;
}