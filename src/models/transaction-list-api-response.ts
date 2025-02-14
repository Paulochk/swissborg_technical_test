import {Transaction} from "@/models/transaction.ts";

export interface TransactionListApiResponse {
    transactions: Transaction[];
}