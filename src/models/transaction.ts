import {TransactionTypeEnum} from "@/models/transaction-type-enum.ts";
import {TransactionStatusEnum} from "@/models/transaction-status-enum.ts";

export interface Transaction {
    id: string;
    timestamp: string;
    type: TransactionTypeEnum;
    status: TransactionStatusEnum;
    currency: string;
    amount: number;
    euroAmount: number | null;
}