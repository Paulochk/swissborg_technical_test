import {Transaction} from "@/models/transaction";
import {describe, expect, test} from "vitest";
import {TransactionTypeEnum} from "@/models/transaction-type-enum.ts";
import {TransactionStatusEnum} from "@/models/transaction-status-enum.ts";
import {calculateTotalsByCurrency} from "@/features/transaction/hooks/use-total-amount.ts";

describe('calculateTotalsByCurrency', () => {
    test("correctly calculates totals for deposits and withdrawals", () => {
        const transactions: Transaction[] = [
            {
                id: "1",
                currency: "USD",
                amount: 100,
                euroAmount: 90,
                type: TransactionTypeEnum.DEPOSIT,
                status: TransactionStatusEnum.COMPLETED,
                timestamp: ""
            },
            {
                id: "2",
                currency: "USD",
                amount: 50,
                euroAmount: 45,
                type: TransactionTypeEnum.WITHDRAWAL,
                status: TransactionStatusEnum.COMPLETED,
                timestamp: ""
            },
            {
                id: "3",
                currency: "EUR",
                amount: 200,
                euroAmount: null,
                type: TransactionTypeEnum.DEPOSIT,
                status: TransactionStatusEnum.PENDING,
                timestamp: ""
            },
        ];

        const result = calculateTotalsByCurrency(transactions);

        expect(result).toEqual([
            {
                id: "USD",
                currency: "USD",
                completedWithdrawals: 50,
                completedDeposits: 100,
                pendingWithdrawals: 0,
                pendingDeposits: 0,
                balance: 50,
                eurBalance: 45,
                hasRates: true,
            },
            {
                id: "EUR",
                currency: "EUR",
                completedWithdrawals: 0,
                completedDeposits: 0,
                pendingWithdrawals: 0,
                pendingDeposits: 200,
                balance: 0,
                eurBalance: 0,
                hasRates: false,
            },
        ]);
    });

    test("returns an empty array when no transactions are given", () => {
        const result = calculateTotalsByCurrency([]);
        expect(result).toEqual([]);
    });

    test("handles multiple currencies correctly", () => {
        const transactions: Transaction[] = [
            {
                id: "1",
                currency: "BTC",
                amount: 1,
                euroAmount: 50000,
                type: TransactionTypeEnum.DEPOSIT,
                status: TransactionStatusEnum.COMPLETED,
                timestamp: ""
            },
            {
                id: "2",
                currency: "ETH",
                amount: 2,
                euroAmount: 4000,
                type: TransactionTypeEnum.DEPOSIT,
                status: TransactionStatusEnum.PENDING,
                timestamp: ""
            },
            {
                id: "3",
                currency: "BTC",
                amount: 0.5,
                euroAmount: 25000,
                type: TransactionTypeEnum.WITHDRAWAL,
                status: TransactionStatusEnum.COMPLETED,
                timestamp: ""
            },
        ];

        const result = calculateTotalsByCurrency(transactions);

        expect(result).toEqual([
            {
                id: "BTC",
                currency: "BTC",
                completedWithdrawals: 0.5,
                completedDeposits: 1,
                pendingWithdrawals: 0,
                pendingDeposits: 0,
                balance: 0.5,
                eurBalance: 25000,
                hasRates: true,
            },
            {
                id: "ETH",
                currency: "ETH",
                completedWithdrawals: 0,
                completedDeposits: 0,
                pendingWithdrawals: 0,
                pendingDeposits: 2,
                balance: 0,
                eurBalance: 0,
                hasRates: true,
            },
        ]);
    });
});
